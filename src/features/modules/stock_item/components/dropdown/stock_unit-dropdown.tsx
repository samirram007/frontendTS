import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockUnitService } from "@/features/modules/stock_unit/data/api";
import type { State } from "../../../state/data/schema";
import type { StockItemForm } from "../../data/schema";
import AlternateStockUnitDropdown from "./alternate_stock_unit-dropdown";

type Props = {
    form: UseFormReturn<StockItemForm>;
    config: { key: string; value: boolean }[];
}

const StockUnitDropdown = (props: Props) => {
    const { form, config } = props

    const { data: stockUnitList, isLoading } = useQuery({
        queryKey: ["stock_units"],
        queryFn: fetchStockUnitService,
    });

    //const stateId = form.watch('stateId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('stockUnitId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <FormField
                control={form.control}
                name='stockUnitId'
                render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                        <FormLabel className='col-span-2 text-right'>
                            Units
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
            {/* Show message if 'alternate_units' config is set to false
             Configured to hide Alternate Units field */}
            {config.map((item) => item.key === 'alternate_units' && item.value && (
                <div className="text-sm text-muted-foreground col-span-6 md:col-span-4 md:col-start-3">
                    * To add Alternate Units, please select the Alternate Units field.
                    <AlternateStockUnitDropdown form={form} />
                </div>
            ))}
        </>
    )
}

export default StockUnitDropdown