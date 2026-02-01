import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { fetchStorageUnitService } from "../../data/api";
import type { StorageUnit, StorageUnitForm } from "../../data/schema";




type Props = {
    form: UseFormReturn<StorageUnitForm>;
    gapClass?: string;
    rtl?: boolean;
};
const StorageUnitDropdown = (props: Props) => {
    const { form, gapClass, rtl } = props as Props;
    const { data: StorageUnitList, isLoading } = useQuery({
        queryKey: ["StorageUnits"],
        queryFn: fetchStorageUnitService,
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
                    <FormItem
                        className={cn(
                            'grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1',
                            gapClass
                        )}   >
                        <FormLabel className={rtl ? 'order-last' : ''}>
                            Under
                        </FormLabel>


                        <SelectDropdown
                            defaultValue={field.value ? field.value.toString() : ''}
                            onValueChange={(value) => handleValueChange(value)}
                            placeholder='Select a Storage unit'
                            className='w-11/12 '
                            items={StorageUnitList?.data.map((storageUnit: StorageUnit) => ({
                                label: capitalizeAllWords(storageUnit.name),
                                value: String(storageUnit.id),
                            }))}
                        />
                        <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                )}
            />
        </>

    )
}

export default StorageUnitDropdown