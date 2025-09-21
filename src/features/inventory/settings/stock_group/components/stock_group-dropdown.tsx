import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockGroupService } from "../data/api";
import type { StockGroup } from "../data/schema";
import type { StockGroupForm } from "../types/types";



type Props = {
    form: UseFormReturn<StockGroupForm>;
};
const StockGroupDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: StockGroupList, isLoading } = useQuery({
        queryKey: ["StockGroups"],
        queryFn: fetchStockGroupService,
    });

    const handleValueChange = (value: string) => {
        form.setValue('parentId', Number(value));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FormField
                control={form.control}
                name='parentId'
                render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1 '>
                        <FormLabel className='col-span-2 text-right mt-3'>
                            Under
                        </FormLabel>
                        <div className="w-full flex gap-2 flex-row items-center justify-start col-span-4 space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select a parent group'
                                className='w-11/12 col-span-6 md:col-span-4'
                                items={StockGroupList?.data.map((stockGroup: StockGroup) => ({
                                    label: capitalizeAllWords(stockGroup.name),
                                    value: String(stockGroup.id),
                                }))}
                            />


                        </div>
                        <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                )}
            />
        </>

    )
}

export default StockGroupDropdown