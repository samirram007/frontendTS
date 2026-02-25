import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { fetchStockItemService } from "@/features/modules/stock_item/data/api";
import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api";
import type { StockUnit } from "@/features/modules/stock_unit/data/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import isEqual from "lodash/isEqual";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { MdKeyboardReturn } from "react-icons/md";
import { TbRowRemove } from "react-icons/tb";
import { useFocusArea } from "@/core/hooks/useFocusArea";
import { useTransaction } from "@/features/transactions/context/transaction-context";
import { StockItemCombobox } from "../dropdown/stock-item-combo-box";
import { stockJournalEntrySchema, type StockJournalEntryForm, type StockJournalForm } from "../../data-schema/voucher-schema";
import { usePos } from "../../contexts/pos-context";
import { lowerCase } from "lodash";
import { stockJournalEntryDefaultValues } from "../../data-schema/data";

type StockJournalEntry02Props = {
    index: number;
    remove: (index: number) => void;
    handleOnClickItemAddEntry: () => void
    fieldsLength: number;
    stockJournalForm: UseFormReturn<StockJournalForm>;
};

export const StockJournalEntry02 = (props: StockJournalEntry02Props) => {
    const { index, remove, handleOnClickItemAddEntry, fieldsLength, stockJournalForm } = props;
    const { remarksRef, setIsRemarksDisabled, movementType } = usePos()
    const { config } = useTransaction()
    const itemEntryRef = useRef<HTMLDivElement>(null);
    useFocusArea(itemEntryRef as React.RefObject<HTMLElement>);
    const entryPath = `stockJournalEntries.${index}` as const;
    const [stockItems, stockUnits,] = useQueries({
        queries: [
            { queryKey: ["stockItems"], queryFn: fetchStockItemService },
            { queryKey: ["stockUnits"], queryFn: fetchStockUnitService },
        ],
    });
    const stockJournalEntryForm = useForm<StockJournalEntryForm>({
        resolver: zodResolver(stockJournalEntrySchema) as Resolver<StockJournalEntryForm>,
        // defaultValues: {
        //     ...stockJournalEntryDefaultValues,
        //     movementType: lowerCase(movementType),
        //     ...stockJournalForm.watch(entryPath),
        // },
        defaultValues:
            stockJournalForm.watch(entryPath) ?? { ...stockJournalEntryDefaultValues, movementType: lowerCase(movementType) },
        mode: "onChange",
    });

    const handleRemoveClick = () => {
        remove(index);
        if (fieldsLength === 1) {
            handleOnClickItemAddEntry();
        }
        setIsRemarksDisabled?.(false);
        requestAnimationFrame(() => {
            remarksRef?.current?.focus();
        });
    };
    useEffect(() => {
        const parentData = stockJournalForm.getValues(entryPath);
        if (parentData && !isEqual(parentData, stockJournalEntryForm.getValues())) {
            stockJournalEntryForm.reset(parentData);
        }
    }, [entryPath]);
    // useEffect(() => {
    //     const parentData = stockJournalForm.getValues(entryPath);

    //     if (parentData && !isEqual(parentData, stockJournalEntryForm.getValues())) {
    //         stockJournalEntryForm.reset({
    //             ...stockJournalEntryDefaultValues,
    //             movementType: lowerCase(movementType),
    //             ...parentData,
    //         });
    //     }
    // }, [entryPath, movementType]);

    useEffect(() => {
        const subscription = stockJournalEntryForm.watch((value) => {
            const currentParentData = stockJournalForm.getValues(entryPath);
            if (!isEqual(currentParentData, value)) {
                stockJournalForm.setValue(entryPath, value as StockJournalEntryForm, {
                    shouldValidate: true,
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [stockJournalEntryForm, stockJournalForm, entryPath]);
    useEffect(() => {
        const qty = Number(stockJournalEntryForm.watch("orderQuantity") || 0);
        const rate = Number(stockJournalEntryForm.watch("rate") || 0);
        stockJournalEntryForm.setValue("amount", qty * rate);
    }, [
        stockJournalEntryForm.watch("orderQuantity"),
        stockJournalEntryForm.watch("rate"),
    ]);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleOnClickItemAddEntry();
        }
    };

    // console.log(stockJournalEntryForm.watch());
    

    if ([stockItems, stockUnits].some((r) => r.isLoading))
        return <Loader size={20} className="animate-spin" />;

    return (
        <Form {...stockJournalEntryForm}>
            <div ref={itemEntryRef} className="w-full grid grid-rows-1">
                <div className="grid grid-rows-1 grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                                text-center border-border justify-start items-start font-bold">
                    <StockItemCombobox
                        stockJournalEntryForm={stockJournalEntryForm}
                        handleRemove={handleRemoveClick}
                        rowIndex={index}
                        stockItems={stockItems?.data?.data}
                    />
                    <div className="grid grid-cols-2 items-start text-right">
                        <input
                            type="number"
                            {...stockJournalEntryForm.register("orderQuantity", { valueAsNumber: true })}
                            className="border px-2 w-full text-right"
                        />
                        {config.find(c => c.key === 'show_actual_and_billing_quantity')?.value && (
                            <input
                                type="number"
                                {...stockJournalEntryForm.register("billingQuantity", { valueAsNumber: true })}
                                className="border px-2 w-full text-right"
                            />
                        )}
                    </div>
                    <input
                        type="number"
                        {...stockJournalEntryForm.register("rate", { valueAsNumber: true })}
                        className="border px-2 w-full text-right"
                    />
                    <div>
                        {stockUnits?.data?.data?.find(
                            (su: StockUnit) => su.id === stockJournalEntryForm.getValues("stockItem.stockUnitId")
                        )?.code}
                    </div>
                    <input
                        type="number"
                        className="border px-2 w-full text-right"
                        {...stockJournalEntryForm.register("discountPercentage", { valueAsNumber: true })}
                    />
                    <input
                        type="number"
                        className="border px-2 w-full text-right"
                        {...stockJournalEntryForm.register("amount", { valueAsNumber: true })}
                        onKeyDown={handleKeyDown}
                    />
                    {/* <div className="text-right  pr-3 ">
                        {stockJournalEntryForm.watch('amount') ? Number(stockJournalEntryForm.watch('amount')).toFixed(2) : ''}
                    </div> */}
                    <div className="flex flex-row justify-end items-start gap-4 px-4">
                        <Button type="button" variant={'outline'} className=" border-0  h-6 focus:bg-black focus:text-white"
                            onClick={handleOnClickItemAddEntry}>
                            <MdKeyboardReturn />
                        </Button>
                        <Button variant="outline" size="sm"
                            onClick={handleRemoveClick} className="h-6 focus:bg-black focus:text-white" >
                            <TbRowRemove className=" text-red-700 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}; 