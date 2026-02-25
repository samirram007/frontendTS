import type { UseFormReturn } from "react-hook-form"
import type { PurchaseOrderForm } from "../../../data/schema"
import { usePurchaseOrderMutation } from "../../../data/queryOption";
import React, { useEffect, useState } from "react";
import type { StockJournalEntryForm } from "@/features/modules/voucher/data-schema/voucher-schema";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type SaveDialogProps = {
    mainForm: UseFormReturn<PurchaseOrderForm>
    isSaving: boolean;
    setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveDialog = ({ mainForm, isSaving, setSaving }: SaveDialogProps) => {
    const { mutate: createPurchaseOrder, isPending } = usePurchaseOrderMutation();
    const [errors, setErrors] = useState<string[]>([]);
    const [checking, setChecking] = useState(true);
    const [valid, setValid] = useState(false);
    const handleSaving = () => {
        createPurchaseOrder(mainForm.getValues())
    }
    const saveButtonRef = React.useRef<HTMLButtonElement>(null);
    useEffect(() => {
        let timer: any = null;
        setChecking(true);
        setValid(false);
        timer = setTimeout(() => {
            const data = mainForm.getValues();
            const newErrors: string[] = [];
            // --- BASIC VALIDATIONS ---
            const partyLedgerId = data.partyLedger?.id;
            const transactionLedgerId = data.transactionLedger?.id;
            if (!partyLedgerId) newErrors.push("Party Ledger is required.");
            if (!transactionLedgerId) newErrors.push("Stock Ledger is required.");
            const stockJournalEntries: StockJournalEntryForm[] =
                ((data.stockJournal?.stockJournalEntries || []).filter(Boolean) as StockJournalEntryForm[]);
            if (stockJournalEntries.length === 0) {
                newErrors.push("Please add at least one stock item entry.");
            }
            // --- Duplicate stock item check ---
            const stockItemIds = stockJournalEntries.map(e => e.stockItemId);
            const unique = new Set(stockItemIds);
            if (unique.size !== stockItemIds.length) {
                newErrors.push("Duplicate stock items detected — each stock item must be unique.");
            }
            // --- Combined Entry + Godown validations ---
            stockJournalEntries.forEach((stockJournalEntry, entryIndex) => {
                if (!stockJournalEntry.stockItemId) {
                    newErrors.push(`Entry #${entryIndex + 1}: Stock item is required.`);
                }
                if (!stockJournalEntry.amount || stockJournalEntry.amount <= 0) {
                    newErrors.push(`Entry #${entryIndex + 1}: Amount must be greater than 0.`);
                }
            });
            // UPDATE STATE
            setErrors(newErrors);
            setChecking(false);
            setValid(newErrors.length === 0);
        }, 2000);
        return () => clearTimeout(timer);
    }, [isPending, setSaving]);

    useEffect(() => {
        if (valid) {
            saveButtonRef.current?.focus();
        }
    }, [valid]);

    // console.log(mainForm.watch());
    

    return <div>
        <Dialog open={isSaving}
            onOpenChange={(state) => {

                setSaving(state)
            }} >
            <DialogTrigger asChild>
                <Button type="button"
                    variant="default"
                    className="h-8 w-full focus:bg-black focus:text-white"
                    size="lg"
                    disabled={isSaving}><Loader className="animate-spin" /> Saving...</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-5xl'
                // onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader className='text-left border-b-2 pb-2'>
                    <DialogTitle>Purchase Order </DialogTitle>
                    <DialogDescription>
                        Please wait while we are saving the purchase order.
                    </DialogDescription>
                </DialogHeader>
                <div className='-mr-4 h-full w-full overflow-y-auto py-1 pr-4'>
                    {checking && (
                        <div className="text-blue-500 animate-pulse">
                            Validating...
                        </div>
                    )}

                    {valid && (
                        <div className="text-green-600 font-semibold animate-bounce">
                            ✔ All checks passed!
                        </div>
                    )}

                    {errors.length > 0 && (
                        <ul className="text-red-500 space-y-1 mt-2">
                            {errors.map((err, i) => (
                                <li key={i} className="flex gap-2">
                                    • <span>{err}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={handleSaving}
                        ref={saveButtonRef}
                        disabled={isPending || errors.length > 0 || checking || !valid}
                        className={`h-8 ${valid ? "focus:bg-black focus:text-white" : ""}`}  >
                        Save changes
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog >

    </div>
}
export default SaveDialog;