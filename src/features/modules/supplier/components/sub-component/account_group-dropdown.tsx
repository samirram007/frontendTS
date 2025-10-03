import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchAccountGroupService } from "@/features/masters/accounts/services/apis";
import type { AccountGroup } from "@/features/modules/account_group/data/schema";
import type { SupplierForm } from "../../data/schema";




type Props = {
    form: UseFormReturn<SupplierForm>;
};
const AccountGroupDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: accountGroups, isLoading } = useQuery({
        queryKey: ["accountGroups"],
        queryFn: fetchAccountGroupService,
    });

    const handleValueChange = (value: string) => {
        form.setValue('accountGroupId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <FormField
                control={form.control}
                name='accountGroupId'
                render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1 '>
                        <FormLabel className='col-span-2 text-right mt-3'>
                            Under
                        </FormLabel>
                        <div className="w-full flex gap-2 flex-row items-center justify-start col-span-4 space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select a account group'
                                className='w-11/12 col-span-6 md:col-span-4'
                                items={accountGroups?.data.map((accountGroup: AccountGroup) => ({
                                    label: capitalizeAllWords(accountGroup.name),
                                    value: String(accountGroup.id),
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

export default AccountGroupDropdown