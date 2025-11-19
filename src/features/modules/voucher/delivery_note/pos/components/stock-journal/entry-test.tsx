
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
            { queryKey: ["stockItems"], queryFn: fetchStockItemService, staleTime: 1000 * 60 * 1, },
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
    // const {   watch } = stockJournalEntryForm;
    // const qty = watch("billingQuantity");
    // const rate = watch("rate");

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
// type stockJournalGodownEntriesShowProps = {
//     stockJournalEntryForm: UseFormReturn<StockJournalEntryForm>;
//     godowns: Godown[] | undefined;
//     stockUnits: StockUnit[] | undefined;
// }
// const StockJournalGodownEntriesShow = ({ stockJournalEntryForm, godowns, stockUnits }: stockJournalGodownEntriesShowProps) => {
//     const stockJournalGodownEntries = stockJournalEntryForm.watch('stockJournalGodownEntries');
//     return <div>
//         {
//             // JSON.stringify(stockJournalEntryForm.watch('stockJournalGodownEntries'))
//             stockJournalGodownEntries &&
//             stockJournalGodownEntries.map((entry, index) => (
//                 <div key={index} className="grid grid-cols-[1fr_280px_300px_150px_80px_80px_200px_120px]  border-b border-dashed border-gray-400   ">

//                     <div className="">
//                         <span className="font-bold">Godown: </span>
//                         <span>

//                             {entry?.godown?.name ?? godowns?.find((g: Godown) => g.id === entry?.godownId)?.name}
//                         </span>
//                     </div>
//                     <div className="text-center space-y-0 text-sm font-bold">
//                         <div className="text-left border-b-[1px] border-dashed border-gray-900">BATCH NO.:
//                             <span className="font-normal">{entry?.batchNo}</span></div>
//                         <div className="grid grid-cols-2 ">
//                             <div className="text-left">MFG:
//                                 <span className="font-normal">{entry?.mfgDate?.toLocaleDateString()}</span></div>
//                             <div className="text-left">
//                                 EXP: <span className="font-normal">{entry?.expiryDate?.toLocaleDateString()}</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-2 text-center">
//                         <div>{entry?.actualQuantity} {entry?.stockUnit?.code ?? stockUnits?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
//                         <div>{entry?.billingQuantity} {entry?.stockUnit?.code ?? stockUnits?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
//                     </div>

//                     <div className="text-right">{entry?.rate} </div>
//                     <div><span className="font-bold">/</span> {entry?.rateUnit?.code ?? stockUnits?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
//                     <div className="text-right">{entry?.discountPercentage}</div>
//                     <div className="text-right">{entry?.amount}</div>

//                 </div>
//             ))
//         }
//     </div>;
// }