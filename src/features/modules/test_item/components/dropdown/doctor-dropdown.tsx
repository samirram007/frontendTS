'use client'

import { useQuery } from '@tanstack/react-query'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectDropdown } from '@/components/select-dropdown'
import { cn } from '@/lib/utils'
import { capitalizeAllWords } from '@/utils/removeEmptyStrings'
import type { UseFormReturn } from 'react-hook-form'
import type { TestItemConfiguration } from '../../data/schema'

import { employeeQueryOptions } from '@/features/modules/employee/data/queryOptions'

type Props = {
  form: UseFormReturn<TestItemConfiguration>
  gapClass?: string
}

export function DoctorDropdown({ form, gapClass }: Props) {
  const { data, isLoading } = useQuery(employeeQueryOptions());

  if (isLoading) return <div>Loading doctors...</div>



  return (
    <FormField
      control={form.control}
      name='doctorId'
      render={({ field }) => (
        <FormItem className={cn('grid grid-cols-[150px_1fr] items-center gap-x-4', gapClass)}>
          <FormLabel>Doctor</FormLabel>
          <SelectDropdown
           key={field.value ?? 'empty'} 
            defaultValue={field.value?.toString() ?? ''}
            onValueChange={(value) => field.onChange(Number(value) || undefined)}
            placeholder='Select Doctor'
            className='w-full'
            items={data?.data.map((doc: any) => ({
              label: capitalizeAllWords(doc.name),
              value: String(doc.id),
            }))}
          />
          <FormMessage className='col-span-2' />
        </FormItem>
      )}
    />
  )
}