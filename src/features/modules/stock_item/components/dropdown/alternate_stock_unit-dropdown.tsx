import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api";
import type { State } from "../../../state/data/schema";
import type { StockItemForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<StockItemForm>;
}

const AlternateStockUnitDropdown = (props: Props) => {
    const { form } = props

    const { data: stockUnitList, isLoading } = useQuery({
        queryKey: ["stock_units"],
        queryFn: fetchStockUnitService,
    });

    //const stateId = form.watch('stateId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('alternativeStockUnitId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='alternativeStockUnitId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Alternate Units
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a stock unit'
                        className='w-full col-span-6 md:col-span-4'
                        items={stockUnitList?.data.map((stockUnit: State) => ({
                            label: capitalizeAllWords(stockUnit.name),
                            value: String(stockUnit.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default AlternateStockUnitDropdown