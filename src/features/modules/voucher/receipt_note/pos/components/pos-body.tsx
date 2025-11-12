import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useEffect, useMemo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { stockJournalSchema, type ReceiptNoteForm, type StockJournalEntryForm, type StockJournalForm } from "../../data/schema";
import StockJournal from "./stock-journal";



const PosBody = () => {
    const receiptNoteForm = useFormContext<ReceiptNoteForm>();
    const stockJournal = receiptNoteForm.watch("stockJournal")
    const stockJournalForm = useForm<StockJournalForm>({
        resolver: zodResolver(stockJournalSchema),
        defaultValues: {
            ...stockJournal,
            stockJournalEntries: stockJournal?.stockJournalEntries ?? []
        }
    })
    const stockJournalTotal = useMemo(() => {
        const entries = (stockJournalForm.watch("stockJournalEntries") || []).filter(
            (entry): entry is StockJournalEntryForm => entry !== undefined && entry !== null
        );
        const totalAmount = entries.reduce((acc: number, entry: StockJournalEntryForm) => {
            const amount = Number(entry.amount) || 0;
            acc += amount;
            return acc;
        }, 0);
        return {
            totalAmount
        }
    }, [stockJournalForm.watch("stockJournalEntries")])

    useEffect(() => {
        // when parent changes, update child
        const parentValue = receiptNoteForm.getValues("stockJournal");
        if (parentValue && !isEqual(parentValue, stockJournalForm.getValues())) {
            stockJournalForm.reset(parentValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptNoteForm.watch("stockJournal")]);

    useEffect(() => {
        // when child changes, update parent
        const subscription = stockJournalForm.watch((value) => {
            const currentParent = receiptNoteForm.getValues("stockJournal");
            if (!isEqual(currentParent, value)) {
                receiptNoteForm.setValue("stockJournal", value as StockJournalForm, {
                    shouldValidate: false,
                });
    }
        });

        return () => subscription.unsubscribe();
    }, [receiptNoteForm, stockJournalForm]);

    // console.log("PosBody Level: ", receiptNoteForm.watch("stockJournal"), stockJournalForm.watch("stockJournalEntries"));
    return (
        <div className="flex flex-col w-full gap-0   items-start overflow-y-scroll px-2  ">
            <div className="grid grid-cols-1 w-full gap-2   items-start overflow-y-scroll px-2  ">
                <Form {...stockJournalForm}>

                    <StockJournal />
                </Form>
            </div>
            {stockJournalTotal && stockJournalTotal.totalAmount > 0 && (
                <div className="w-full flex justify-end  font-bold">
                    <div className="grid grid-cols-[1fr_200px_120px] gap-4 text-right ">
                        <div>Item Total: </div>
                        <div className="pr-4">{stockJournalTotal.totalAmount.toFixed(2)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PosBody