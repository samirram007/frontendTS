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

    //  const parentId = form.watch('parentId') as string | number | undefined;; // Watch form value for reactivity
    // const stockGroup: StockGroup | null = useMemo(() => {
    //     if (!StockGroupList?.data) return null;
    //     return StockGroupList.data.find((group: StockGroup) => group.id === Number(parentId)) || null;
    // }, [parentId, StockGroupList?.data]);

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
                            Parent Category
                        </FormLabel>
                        <div className="w-full flex gap-2 flex-row items-center justify-start col-span-4 space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select a voucher category'
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