import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { fetchCompanyTypeService } from "../../company_type/data/api";
import type { CompanyType } from "../../company_type/data/schema";
import type { CompanyForm } from "../../company/data/schema";

type Props = {
    form: UseFormReturn<CompanyForm>;
}

const CompanyTypeDropdown = (props: Props) => {
    const { form } = props

    const { data: companyTypeList, isLoading } = useQuery({
        queryKey: ["companyTypes"],
        queryFn: fetchCompanyTypeService,
    });

    //const companyTypeId = form.watch('companyTypeId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('companyTypeId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='companyTypeId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Company Type
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select an company type'
                        className='w-full col-span-6 md:col-span-4'
                        items={companyTypeList?.data.map((companyType: CompanyType) => ({
                            label: capitalizeAllWords(companyType.name),
                            value: String(companyType.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default CompanyTypeDropdown