import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchStateService } from "../../../state/data/api";
import type { State } from "../../../state/data/schema";
import type { SupplierForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<SupplierForm>;
}

const StateDropdown = (props: Props) => {
    const { form } = props

    const { data: stateList, isLoading } = useQuery({
        queryKey: ["states"],
        queryFn: fetchStateService,
    });

    //const stateId = form.watch('stateId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('address.state_id', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='address.state_id'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        State
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a state'
                        className='w-full col-span-6 md:col-span-4'
                        items={stateList?.data.map((state: State) => ({
                            label: capitalizeAllWords(state.name),
                            value: String(state.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default StateDropdown