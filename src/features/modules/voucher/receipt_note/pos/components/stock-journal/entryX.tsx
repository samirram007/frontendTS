import { Form } from "@/components/ui/form"
import { fetchGodownService } from "@/features/modules/godown/data/api"
import type { Godown } from "@/features/modules/godown/data/schema"
import { fetchStockItemService } from "@/features/modules/stock_item/data/api"
import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api"
import type { StockUnit } from "@/features/modules/stock_unit/data/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueries } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import { stockJournalEntryDefaultValues } from "../../../data/data"
import { stockJournalEntrySchema, type StockJournalEntryForm } from "../../../data/schema"
import { StockItemCombobox } from "../stock-item-combo-box"
import StockJournalGodownEntryGateway from "../stock-journal-godown/entry"

type StockJournalEntryProps = {
    index: number;
};

const StockJournalEntry = (props: StockJournalEntryProps) => {
    const { index, data } = props;
    const stockJournalEntriesForm = useFormContext<{
        stockJournalGodownEntries: StockJournalEntryForm[]
    }>();
    const stockJournalEntryForm = useForm<StockJournalEntryForm>({
        resolver: zodResolver(stockJournalEntrySchema),
        defaultValues: data ? { ...data } : { ...stockJournalEntryDefaultValues },
    });
    const results = useQueries({
        queries: [
            {
                queryKey: ["stockItems"],
                queryFn: fetchStockItemService,
            },
            {
                queryKey: ["godowns"],
                queryFn: fetchGodownService,
            },
            {
                queryKey: ["stockUnits"],
                queryFn: fetchStockUnitService,
            },
        ],
    })

    const [stockItems, godowns, stockUnits] = results


    const stockJournalGodownEntries = stockJournalEntryForm.watch('stockJournalGodownEntries')
    const handleListComplete = () => {
        // Step 1️⃣ - get existing stock journal entries
        const stockJournalEntries = stockJournalEntriesForm?.getValues("stockJournalGodownEntries") ?? [];

        // Step 2️⃣ - get new godown entries from current entry form
        const godownEntries = stockJournalEntryForm.getValues("stockJournalGodownEntries") ?? [];

        // Step 3️⃣ - if there are no new entries, stop early
        if (godownEntries.length === 0) return;

        // Step 4️⃣ - filter out duplicates
        const newUniqueEntries = godownEntries.filter((newEntry) => {
            return !stockJournalEntries.some((existingEntry) =>
                existingEntry?.godownId === newEntry?.godownId &&
                existingEntry?.batchNo === newEntry?.batchNo &&
                existingEntry?.stockItem?.id === newEntry?.stockItem?.id
            );
        });

        // Step 5️⃣ - merge old + new
        const updatedEntries = [...stockJournalEntries, ...newUniqueEntries];

        // Step 6️⃣ - update parent form with merged entries
        stockJournalEntriesForm.setValue("stockJournalGodownEntries", updatedEntries, { shouldValidate: true });

        // Step 7️⃣ - optionally reset entry subform for new input
        stockJournalEntryForm.reset();
        stockJournalEntryForm.clearErrors();
    };
    // console.log("GODOWN ENTRIES: ", stockJournalEntryForm.getValues())
    if (results.some((r) => r.isLoading)) return <div>Loading...</div>
    return (
        <>
            <Form {...stockJournalEntryForm}>
                <div className="  
                    grid grid-rows-1 grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                      text-center border-border justify-start items-start font-bold">

                    <StockItemCombobox
                        form={stockJournalEntryForm}
                        stockItems={stockItems?.data?.data} />
                    <div className="grid grid-cols-2 items-start px-2 text-center">
                        <div>{stockJournalEntryForm.watch('actualQuantity')!} {stockJournalEntryForm.getValues('stockUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>
                        <div>{stockJournalEntryForm.watch('billingQuantity')!} {stockJournalEntryForm.getValues('stockUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>

                    </div>
                    <div className="text-right">{
                        stockJournalEntryForm.watch('rate') ? Number(stockJournalEntryForm.watch('rate')).toFixed(2)
                            : '0'
                    } </div>
                    <div><span className="font-bold">/</span> {stockJournalEntryForm.watch('rateUnit.code') ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === stockJournalEntryForm.getValues('stockItem.stockUnitId'))?.code}</div>
                    <div className="text-right">{
                        stockJournalEntryForm.watch('discountPercentage') ? Number(stockJournalEntryForm.watch('discountPercentage')).toFixed(2) : '0'
                    } %</div>
                    <div className="text-right">{stockJournalEntryForm.watch('amount') ? Number(stockJournalEntryForm.watch('amount')).toFixed(2) : '0'}</div>
                    <div></div>


                </div>
                <div className="grid grid-rows-1 gap-1 mt-1">

                    <div className="flex flex-col gap-1 pl-20">


                        {
                            // JSON.stringify(stockJournalEntryForm.watch('stockJournalGodownEntries'))
                            stockJournalGodownEntries &&
                            stockJournalGodownEntries.map((entry, index) => (
                                <div key={index} className="grid grid-cols-[1fr_280px_300px_150px_80px_80px_200px_120px]  border-b border-dashed border-gray-400   ">

                                    <div className="">
                                        <span className="font-bold">Godown: </span>
                                        <span>

                                            {entry?.godown?.name ?? godowns?.data?.data?.find((g: Godown) => g.id === entry?.godownId)?.name}
                                        </span>
                                    </div>
                                    <div className="text-center space-y-0 text-sm font-bold">
                                        <div className="text-left border-b-[1px] border-dashed border-gray-900">BATCH NO.:
                                            <span className="font-normal">{entry?.batchNo}</span></div>
                                        <div className="grid grid-cols-2 ">
                                            <div className="text-left">MFG:
                                                <span className="font-normal">{entry?.mfgDate?.toLocaleDateString()}</span></div>
                                            <div className="text-left">
                                                EXP: <span className="font-normal">{entry?.expDate?.toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 text-center">
                                        <div>{entry?.actualQuantity} {entry?.stockUnit?.code ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
                                        <div>{entry?.billingQuantity} {entry?.stockUnit?.code ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
                                    </div>

                                    <div className="text-right">{entry?.rate} </div>
                                    <div><span className="font-bold">/</span> {entry?.rateUnit?.code ?? stockUnits?.data?.data?.find((su: StockUnit) => su.id === entry?.stockItem?.stockUnitId)?.code}</div>
                                    <div className="text-right">{entry?.discountPercentage}</div>
                                    <div className="text-right">{entry?.amount}</div>

                                </div>
                            ))
                        }
                        {
                            stockJournalEntryForm.watch('stockItem') &&
                            <StockJournalGodownEntryGateway
                                onSave={handleListComplete}
                                stockItem={stockJournalEntryForm.watch('stockItem')!}
                                godowns={godowns?.data?.data}
                                stockUnits={stockUnits?.data?.data}
                                stockJournalEntryForm={stockJournalEntryForm}


                            />
                        }
                    </div>
                </div>
                {/* <div className="flex flex-row justify-end">

                    <Button type="submit" onSubmit={handleSubmit}>Item(s) save</Button>
                </div> */}
            </Form>


        </>
    )
}

export default StockJournalEntry