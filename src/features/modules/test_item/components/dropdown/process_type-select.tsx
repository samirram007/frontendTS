import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEnum } from "@/features/enums/api";

import { SelectDropdown } from "@/components/select-dropdown";
import type { ProcessType } from "@/features/enums/schema";
import { cn } from "@/lib/utils";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import type { UseFormReturn } from "react-hook-form";
import type { TestItemForm } from "../../data/schema";



type Props = {
    form: UseFormReturn<TestItemForm>;
    gapClass?: string;
}


const ProcessTypeSelect = (props: Props) => {
    const { form, gapClass } = props as Props;
    const isEdit = form.getValues('isEdit')
    const { data: ProcessTypes } = useEnum("process_type");
    const handleValueChange = (value: string) => {
        form.setValue('processType', value as ProcessType);

    };
    return (
        <>
            <FormField
                control={form.control}
                name='processType'
                render={({ field }) => (
                    <FormItem
                        className={cn(
                            'grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1',
                            gapClass
                        )} >
                        <FormLabel className='pt-1  '>
                            Process Type
                        </FormLabel>
                        <div className="w-full flex gap-2 flex-row items-center justify-start  space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select a type of supply'
                                className={cn("w-full", isEdit && " cursor-not-allowed")}
                                items={(ProcessTypes ?? []).map((processType: string) => ({
                                    label: capitalizeAllWords(processType),
                                    value: processType as ProcessType,
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
export default ProcessTypeSelect
