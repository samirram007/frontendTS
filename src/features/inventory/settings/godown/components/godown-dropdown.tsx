import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchGodownService } from "../data/api";
import type { Godown, GodownForm } from "../data/schema";




type Props = {
    form: UseFormReturn<GodownForm>;
};
const GodownDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: GodownList, isLoading } = useQuery({
        queryKey: ["Godowns"],
        queryFn: fetchGodownService,
    });

    //  const parentId = form.watch('parentId') as string | number | undefined;; // Watch form value for reactivity
    // const godown: Godown | null = useMemo(() => {
    //     if (!GodownList?.data) return null;
    //     return GodownList.data.find((group: Godown) => group.id === Number(parentId)) || null;
    // }, [parentId, GodownList?.data]);

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
                                placeholder='Select a voucher category'
                                className='w-11/12 col-span-6 md:col-span-4'
                                items={GodownList?.data.map((godown: Godown) => ({
                                    label: capitalizeAllWords(godown.name),
                                    value: String(godown.id),
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

export default GodownDropdown