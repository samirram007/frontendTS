import { Form } from "@/components/ui/form"
import { fetchGodownService } from "@/features/modules/godown/data/api"
import { fetchStockItemService } from "@/features/modules/stock_item/data/api"
import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueries } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { useForm, useFormContext } from "react-hook-form"
import { stockJournalEntryDefaultValues } from "../../../data/data"
import { stockJournalEntrySchema, type StockJournalEntryForm, type StockJournalForm } from "../../../data/schema"
import { StockItemCombobox } from "../stock-item-combo-box"

type StockJournalEntryProps = {
    index: number;
};

const StockJournalEntry = ({ index }: StockJournalEntryProps) => {
    const stockJournalForm = useFormContext<StockJournalForm>();
    const entryPath = `stockJournalEntries.${index}` as const;

    const [stockItems, godowns, stockUnits,] = useQueries({
        queries: [
            { queryKey: ["stockItems"], queryFn: fetchStockItemService },
            { queryKey: ["godowns"], queryFn: fetchGodownService },
            { queryKey: ["stockUnits"], queryFn: fetchStockUnitService },
        ],
    });
    if ([stockItems, godowns, stockUnits].some((r) => r.isLoading))
        return <Loader size={20} className="animate-spin" />;


    // 🔹 Create isolated child form for this entry
    const stockJournalEntryForm = useForm<StockJournalEntryForm>({
        defaultValues:
            stockJournalForm.getValues(entryPath) ?? stockJournalEntryDefaultValues,
        resolver: zodResolver(stockJournalEntrySchema),
        mode: "onChange",
    });

    // Create a nested form for the entry




    return (
        <Form {...stockJournalEntryForm}>
            <div className="border p-2">
                <div className="grid grid-cols-[1fr_150px_100px] items-center gap-2">
                    <StockItemCombobox
                        form={stockJournalEntryForm}
                        name="stockItem"
                        stockItems={stockItems.data?.data}
                    />
                    <input
                        type="number"
                        {...stockJournalEntryForm.register("rate", { valueAsNumber: true })}
                        placeholder="Rate"
                    />
                    <span>{stockJournalEntryForm.getValues("amount")?.toFixed(2) ?? 0}</span>
                </div>

                {/* {entry?.stockItem ? (
                <StockJournalGodowns
                    stockItem={entry.stockItem}
                    godowns={godowns.data?.data}
                    stockUnits={stockUnits.data?.data}

                />
            ) : (
                <div>Please select a stock item.</div>
            )} */}
            </div>
        </Form>
    );
};

export default StockJournalEntry