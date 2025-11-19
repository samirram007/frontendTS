import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeliveryNoteMutation } from '../../data/queryOptions';
import type { DeliveryNoteForm } from '../../data/schema';
import NarrationBox from './special/narration-box';


const PosFooter = () => {
    const mainForm = useFormContext<DeliveryNoteForm>();
    const { mutate: createDeliveryNote, isPending } = useDeliveryNoteMutation();
    const { watch } = mainForm;
    const total = watch("stockJournal.stockJournalEntries")?.reduce((acc, entry) => acc + (entry?.amount || 0), 0) || 0;
    useEffect(() => {
        const voucherEntries = mainForm.getValues("voucherEntries") || [];

        const transactionLedgerId = mainForm.getValues("transactionLedger.id");
        const partyLedgerId = mainForm.getValues("partyLedger.id");

        if (!transactionLedgerId || !partyLedgerId) return;

        let updated = [...voucherEntries];

        // --- STEP 1: ensure transaction entry exists ---
        let transactionEntry = updated.find(
            (e) => e && e.accountLedgerId === transactionLedgerId
        );

        if (!transactionEntry) {
            transactionEntry = {
                id: undefined,
                voucherId: undefined,
                accountLedgerId: transactionLedgerId,
                debit: 0,
                credit: 0,
                remarks: "",
                entryOrder: updated.length + 1,
            };
            updated.push(transactionEntry);
        }

        // --- STEP 2: ensure party entry exists ---
        let partyEntry = updated.find(
            (e) => e && e.accountLedgerId === partyLedgerId
        );

        if (!partyEntry) {
            partyEntry = {
                id: undefined,
                voucherId: undefined,
                accountLedgerId: partyLedgerId,
                debit: 0,
                credit: 0,
                remarks: "",
                entryOrder: updated.length + 1,
            };
            updated.push(partyEntry);
        }

        // --- STEP 3: update debit/credit values ---
        updated = updated.filter((entry) => entry !== null && entry !== undefined).map((entry, idx) => {
            // ensure entryOrder is always correct
            const entryOrder = idx + 1;

            if (entry.accountLedgerId === transactionLedgerId) {
                return {
                    ...entry,
                    accountLedgerId: transactionLedgerId,
                    debit: 0,
                    credit: total,
                    entryOrder,
                };
            }
            if (entry.accountLedgerId === partyLedgerId) {
                return {
                    ...entry,
                    accountLedgerId: partyLedgerId,
                    debit: total,
                    credit: 0,
                    entryOrder,
                };
            }
            return { ...entry, accountLedgerId: entry.accountLedgerId!, entryOrder };
        });

        mainForm.setValue("voucherEntries", updated, {
            shouldValidate: false,
            shouldDirty: true,
        });

    }, [total]);

    const handleSaving = () => {
        console.log('Form submitted', mainForm.getValues());
        createDeliveryNote(mainForm.getValues())
    }

    return (
        <div className="bg-red-300/50 grid grid-cols-[1fr_1fr] px-8">
            <div className="grid ">


                <Button
                    type="button" asChild onClick={() => {
                        console.log('Form submitted', mainForm.getValues());
                        createDeliveryNote(mainForm.getValues());
                    }}>

                    <NarrationBox type="textarea" form={mainForm} gapClass={''} className=" " name="narration" />
                </Button>



            </div>
            <div className="grid grid-rows-[1fr_1fr] grid-cols-[1fr_140px] items-center  justify-end">

                <div className="text-right font-bold  ">
                    Total: {total ? Number(total).toFixed(2) : 0}
                </div>
                <div className="text-left pl-2">
                    <Button
                        type="button"
                        variant="default"
                        className="h-7 focus:bg-black focus:text-white"
                        size="lg"
                        disabled={isPending}
                        onClick={handleSaving}>Save....</Button>

                </div>
            </div>

        </div>


    )
}

export default PosFooter