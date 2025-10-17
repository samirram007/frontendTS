'use client'

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectDropdown } from '@/components/select-dropdown'
import { cn } from '@/lib/utils'
import { capitalizeAllWords } from '@/utils/removeEmptyStrings'
import type { UseFormReturn } from 'react-hook-form'
import type { TestItemConfiguration } from '../../data/schema'

import { useReportTemplateFile } from '@/features/report-templates/report-templates'

type Props = {
  form: UseFormReturn<TestItemConfiguration>
  gapClass?: string
}

export function ReportTemplateFileDropdown({ form, gapClass }: Props) {
    const {data,isLoading} = useReportTemplateFile();

    console.log("File Data",data);

  if (isLoading) return <div>Loading report templates...</div>

  

  return (
    <FormField
      control={form.control}
      name='reportTemplateName'
      render={({ field }) => (
        <FormItem className={cn('grid grid-cols-[150px_1fr] items-center gap-x-4', gapClass)}>
          <FormLabel>Report File Template</FormLabel>
          <SelectDropdown
          key={field.value ?? 'empty'} 
            defaultValue={field.value?.toString() ?? ''}
            onValueChange={(value) => field.onChange(value || '')}
            placeholder='Select Template File'
            className='w-full'
            items={data?.map((doc: any) => ({
              label: capitalizeAllWords(doc),
              value: String(doc),
            }))}
          />
          <FormMessage className='col-span-2' />
        </FormItem>
      )}
    />
  )
}