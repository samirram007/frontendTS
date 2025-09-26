import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockGroupService } from "@/features/modules/stock_group/data/api";
import type { Country } from "../../../country/data/schema";
import type { StockItemForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<StockItemForm>;
}

const StockGroupDropdown = (props: Props) => {
    const { form } = props

    const { data: stockGroupList, isLoading } = useQuery({
        queryKey: ["stock_groups"],
        queryFn: fetchStockGroupService,
    });

    //const stockGroupId = form.watch('stockGroupId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('stockGroupId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='stockGroupId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Under
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a stock group'
                        className='w-full col-span-6 md:col-span-4'
                        items={stockGroupList?.data.map((stockGroup: Country) => ({
                            label: capitalizeAllWords(stockGroup.name),
                            value: String(stockGroup.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default StockGroupDropdown