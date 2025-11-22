

import FormInputField from "@/components/form-input-field";
import { useFieldArray, useFormContext } from "react-hook-form";

import { useEffect } from "react";
import { stockJournalEntryDefaultValues } from '../../../data/data';
import { type StockJournalEntryForm, type StockJournalForm } from '../../../data/schema';
import { PosJournalEntryItemProvider, usePosJournalEntryItem } from "../../contexts/pos-journal-entry-item-context";
import { StockJournalEntry } from "./entry-test";

// type StockJournalProps = {
//     stockJournalForm: UseFormReturn<StockJournalForm>;
// }

const StockJournal = () => {

    const stockJournalForm = useFormContext<StockJournalForm>();
    return (
        <div>
            <div className="hidden grid-cols-3 gap-8 ">

                <FormInputField type="text" form={stockJournalForm} name="journalNo" />
                <FormInputField type="date" form={stockJournalForm} name="journalDate" />
                <FormInputField type="text" form={stockJournalForm} name="type" />
            </div>
            <div className="border-inside-all 
                    grid grid-rows-1 grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                    bg-gray-300 text-center border-border">

                <div className="border-r-0!  ">Particulars</div>


                <div className="grid grid-rows-2 border-0!">
                    <div className="border-b-0!  ">Quantity</div>
                    <div className="grid grid-cols-2 items-center">
                        <div className="border-y-0! border-x-0!  ">Actual</div>
                        <div className="border-y-0! border-r-0!  ">Billing</div>
                    </div>
                </div>
                <div className="border-l-0!">Rate</div>
                <div className="border-l-0!">per</div>
                <div className="border-l-0!">disc%</div>
                <div className="border-l-0!">Amount</div>
                <div className="border-l-0!">Action</div>

            </div>
            <PosJournalEntryItemProvider>
                <StockJournalEntriesSection />
            </PosJournalEntryItemProvider>
        </div>
    )
}

export default StockJournal


const StockJournalEntriesSection = () => {
    const stockJournalForm = useFormContext<StockJournalForm>();
    const { addItemEntryButtonRef, addItemButtonVisible, setAddItemButtonVisible } = usePosJournalEntryItem();


    const stockJournalEntryButtonStyles = "bg-blue-500 focus:bg-gray-800 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded";

    const { fields, append, remove } = useFieldArray({
        control: stockJournalForm.control,
        name: "stockJournalEntries",

    });
    const handleOnClickAddEntry = () => {
        // const lastEntry = fields[fields.length - 1];
        // console.log('lastEntry: ', stockJournalForm.getValues('stockJournalEntries'), fields, lastEntry)
        const entries = stockJournalForm.getValues('stockJournalEntries') || [];


        const hasZeroValue = entries.some((entry: any) => Number(entry.amount) === 0);
        // console.log("hasZeroValue: ", hasZeroValue)
        if (hasZeroValue) {
            stockJournalForm.setFocus(`stockJournalEntries.${fields.length - 1}.stockItem`);
            return;
        }
        // const hasChildZeroValue = entries.some((entry: any) =>
        //     entry.stockJournalGodownEntries?.some((child: any) => Number(child.amount) === 0)
        // );
        // // console.log("hasChildZeroValue: ", hasChildZeroValue)

        // if (hasChildZeroValue) {
        //     stockJournalForm.setFocus(`stockJournalEntries.${fields.length - 1}.stockJournalGodownEntries.0.godownId`);
        //     return;
        // }
        append(stockJournalEntryDefaultValues as StockJournalEntryForm);

        setAddItemButtonVisible?.(false);

    }
    useEffect(() => {
        if (fields.length === 0) {
            handleOnClickAddEntry();
        }
    }, [])
    // console.log("Journal Entries Section", stockJournalForm.watch(), stockJournalForm.getValues('stockJournalEntries'))
    return (
        <div className="">
            {fields.map((field, index) => (
                <div key={field.id} className="w-full flex  items-center gap-4 border-b pb-2">
                    <StockJournalEntry
                        key={field.id}
                        index={index}
                        remove={remove}
                        handleOnClickItemAddEntry={handleOnClickAddEntry}
                    />

                </div>
            ))}
            {
                (addItemButtonVisible || fields.length === 0) &&
                <button type="button" ref={addItemEntryButtonRef}
                    className={stockJournalEntryButtonStyles}
                    onClick={handleOnClickAddEntry}>
                    + Add Item
                </button>
            } 
        </div>
    );
};

