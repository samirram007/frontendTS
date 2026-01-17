import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { BuildingForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<BuildingForm>;
}

const STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Maintenance", value: "maintenance" },
];


const StatusDropdown = (props: Props) => {
    const { form } = props

    const handleValueChange = (value: string) => {
        form.setValue('status', value);

    };

    return (
        <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Status
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a status'
                        className='w-full col-span-6 md:col-span-4'
                        items={STATUS_OPTIONS}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default StatusDropdown;