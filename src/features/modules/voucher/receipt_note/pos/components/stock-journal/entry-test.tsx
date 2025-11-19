
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { fetchGodownService } from "@/features/modules/godown/data/api";
import { fetchStockItemService } from "@/features/modules/stock_item/data/api";
import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api";
import type { StockUnit } from "@/features/modules/stock_unit/data/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import isEqual from "lodash/isEqual";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { TbRowRemove } from "react-icons/tb";
import { stockJournalEntryDefaultValues } from "../../../data/data";
import { stockJournalEntrySchema, type StockJournalEntryForm, type StockJournalForm } from "../../../data/schema";
import { PosJournalEntryGodownProvider } from "../../contexts/pos-journal-entry-godown-context";
import { StockItemCombobox } from "../stock-item-combo-box";
import StockJournalGodowns from "../stock-journal-godown";
type StockJournalEntryProps = {
    index: number;
    remove: (index: number) => void;
    handleOnClickItemAddEntry: () => void
};

export const StockJournalEntry = ({ index, remove, handleOnClickItemAddEntry }: StockJournalEntryProps) => {
    // 🔹 Access parent form context
    const stockJournalForm = useFormContext<StockJournalForm>();

    // 🔹 Path to this specific entry in parent form
    const entryPath = `stockJournalEntries.${index}` as const;
    const [stockItems, godowns, stockUnits,] = useQueries({
        queries: [
            { queryKey: ["stockItems"], queryFn: fetchStockItemService },
            { queryKey: ["godowns"], queryFn: fetchGodownService },
            { queryKey: ["stockUnits"], queryFn: fetchStockUnitService },
        ],
    });
    // 🔹 Create isolated child form for this entry
    const stockJournalEntryForm = useForm<StockJournalEntryForm>({
        resolver: zodResolver(stockJournalEntrySchema),
        defaultValues:
            stockJournalForm.watch(entryPath) ?? stockJournalEntryDefaultValues,
        mode: "onChange",
    });


    const handleRemove = () => {
        if (index !== 0) {
            remove(index);
        }

    };
    useEffect(() => {
        const parentData = stockJournalForm.getValues(entryPath);

        // only reset if the value actually differs
        if (parentData && !isEqual(parentData, stockJournalEntryForm.getValues())) {
            stockJournalEntryForm.reset(parentData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entryPath]); // don't include watch here!

    // Sync: child → parent
    useEffect(() => {
        const subscription = stockJournalEntryForm.watch((value) => {
            // only update parent if the data actually differs
            const currentParentData = stockJournalForm.getValues(entryPath);
            if (!isEqual(currentParentData, value)) {
                stockJournalForm.setValue(entryPath, value as StockJournalEntryForm, { shouldValidate: false });
            }
        });

        return () => subscription.unsubscribe();
    }, [stockJournalEntryForm, stockJournalForm, entryPath]);

    if ([stockItems, godowns, stockUnits].some((r) => r.isLoading))
        return <Loader size={20} className="animate-spin" />;

    // console.log("THIS IS HOW: ", stockJournalForm.watch(), stockJournalEntryForm.watch("stockJournalGodownEntries"));
    return (
        <Form {...stockJournalEntryForm}>
            <div className="w-full grid grid-rows-1">

                <div className="grid grid-rows-1 grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                                text-center border-border justify-start items-start font-bold">

                    <StockItemCombobox
                        handleRemove={handleRemove}
                        stockItems={stockItems?.data?.data} />
                    <div className="grid grid-cols-2 items-start  text-right">
                        <div className="pr-3">{stockJournalEntryForm.watch('actualQuantity')!} {stockJournalEntryForm.getValues('stockUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>
                        <div className="pr-3">{stockJournalEntryForm.watch('billingQuantity')!} {stockJournalEntryForm.getValues('stockUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>

                    </div>
                    <div className="text-right   pr-3 ">{
                        stockJournalEntryForm.watch('rate') ? Number(stockJournalEntryForm.watch('rate')).toFixed(2)
                            : '0'
                    } </div>
                    <div className=""><span className="font-bold"></span> {stockJournalEntryForm.watch('rateUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>
                    <div className="text-right  pr-3 ">{
                        stockJournalEntryForm.watch('discountPercentage') ? Number(stockJournalEntryForm.watch('discountPercentage')).toFixed(2) : ''
                    }</div>
                    <div className="text-right  pr-3 ">{stockJournalEntryForm.watch('amount') ? Number(stockJournalEntryForm.watch('amount')).toFixed(2) : ''}</div>
                    <div className="flex flex-row justify-end items-start gap-4 px-4">
                        <Button variant="outline" size="sm" onClick={() => remove(index)} className="h-6 focus:bg-black focus:text-white" >
                            <TbRowRemove className=" text-red-700 h-4 w-4" />
                        </Button>
                    </div>


                </div>
                {/* {
                    stockJournalEntryForm.watch('stockJournalGodownEntries') &&
                    <StockJournalGodownEntriesShow
                        stockJournalEntryForm={stockJournalEntryForm}
                        godowns={godowns?.data?.data}
                        stockUnits={stockUnits?.data?.data} />
                } */}


                {
                    stockJournalEntryForm.watch('stockJournalGodownEntries') &&
                    <PosJournalEntryGodownProvider>

                        <StockJournalGodowns
                            stockItem={stockJournalEntryForm.watch('stockItem')!}
                            godowns={godowns?.data?.data}
                            stockUnits={stockUnits?.data?.data}
                            handleOnClickItemAddEntry={handleOnClickItemAddEntry}
                        />
                    </PosJournalEntryGodownProvider>
                }
            </div>

        </Form>
    );
}; 