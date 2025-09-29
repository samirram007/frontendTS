import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { fetchStockItemService } from "@/features/modules/stock_item/data/api";



type Props = {
    form: UseFormReturn<ComtraForm>;
};
const VoucherCategoryDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: voucherCategoryList, isLoading } = useQuery({
        queryKey: ["stockItems"],
        queryFn: fetchStockItemService,
    });


    const handleValueChange = (value: string) => {
        form.setValue('stockItemId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <FormField
                control={form.control}
                name='voucherCategoryId'
                render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1 '>
                        <FormLabel className='col-span-2 text-right mt-3'>
                            Voucher Category
                        </FormLabel>
                        <div className="w-full flex gap-2 flex-row items-center justify-start col-span-4 space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select a voucher category'
                                className='w-11/12 col-span-6 md:col-span-4'
                                items={voucherCategoryList?.data.map((voucherCategory: VoucherCategory) => ({
                                    label: capitalizeAllWords(voucherCategory.name),
                                    value: String(voucherCategory.id),
                                }))}
                            />
                            {voucherCategory && (
                                <HoverCard>
                                    <HoverCardTrigger>

                                        <div className='text-muted-foreground  '><InfoIcon className="cursor-pointer" size={24} /> </div>

                                    </HoverCardTrigger>
                                    <HoverCardContent>
                                        <div className='font-bold border-b-2'>{voucherCategory?.name}</div>
                                        <div className="font-normal text-sm  ">{voucherCategory?.description}</div>
                                    </HoverCardContent>
                                </HoverCard>
                            )}

                        </div>
                        <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                )}
            />
        </>

    )
}

export default VoucherCategoryDropdown