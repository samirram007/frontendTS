import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchUniqueQuantityCodeService } from "@/features/modules/unique_quantity_code/data/api";
import type { UniqueQuantityCode } from "@/features/modules/unique_quantity_code/data/schema";
import type { StockItemForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<StockItemForm>;
}

const UqcDropdown = (props: Props) => {
    const { form } = props

    const { data: uqcList, isLoading } = useQuery({
        queryKey: ["UniqueQuantityCodes"],
        queryFn: fetchUniqueQuantityCodeService,
    });

    //const stateId = form.watch('stateId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('uqcId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='uqcId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        UQC
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a UQC'
                        className='w-full col-span-6 md:col-span-4'
                        items={uqcList?.data.map((uqc: UniqueQuantityCode) => ({
                            label: capitalizeAllWords(uqc.name),
                            value: String(uqc.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default UqcDropdown