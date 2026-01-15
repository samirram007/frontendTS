import { SelectDropdown } from '@/components/select-dropdown'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { capitalizeAllWords } from '@/utils/removeEmptyStrings'
import { useQuery } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'
import { fetchCompanyTypeService } from '../../../company_type/data/api'
import type { CompanyType } from '../../../company_type/data/schema'
import type { CompanyForm } from '../../data/schema'

type Props = {
  form: UseFormReturn<CompanyForm>
}

const CompanyTypeDropdown = (props: Props) => {
  const { form } = props

  const { data: companyTypeList, isLoading } = useQuery({
    queryKey: ['companyTypes'],
    queryFn: fetchCompanyTypeService,
  })

  //const companyTypeId = form.watch('companyTypeId') as string | number | undefined;; // Watch form value for reactivity
  const handleValueChange = (value: string) => {
    form.setValue('companyTypeId', Number(value))
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <FormField
      control={form.control}
      name="companyTypeId"
      render={({ field }) => (
        <FormItem className="grid grid-cols-[120px_1fr] items-center gap-4 space-y-0">
          <FormLabel>Company Type</FormLabel>

          <div className="w-full">
            <SelectDropdown
              defaultValue={field.value ? field.value.toString() : ''}
              onValueChange={(value) => handleValueChange(value)}
              placeholder="Select a company type"
              items={companyTypeList?.data.map((companyType: CompanyType) => ({
                label: capitalizeAllWords(companyType.name),
                value: String(companyType.id),
              }))}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export default CompanyTypeDropdown
