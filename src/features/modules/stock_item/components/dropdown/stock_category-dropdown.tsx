import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockCategoryService } from "@/features/modules/stock_category/data/api";
import type { Currency } from "../../../currency/data/schema";
import type { StockItemForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<StockItemForm>;
}

const StockCategoryDropdown = (props: Props) => {
    const { form } = props

    const { data: stockCategoryList, isLoading } = useQuery({
        queryKey: ["stock_categories"],
        queryFn: fetchStockCategoryService,
    });

    //const currencyId = form.watch('currencyId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('stockCategoryId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='stockCategoryId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Category
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a stock category'
                        className='w-full col-span-6 md:col-span-4'
                        items={stockCategoryList?.data.map((stockCategory: Currency) => ({
                            label: capitalizeAllWords(stockCategory.name),
                            value: String(stockCategory.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default StockCategoryDropdown