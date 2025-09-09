'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form
} from '@/components/ui/form'


import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import FormInputField from '@/components/form-input-field'

import { storeStockUnitService, updateStockUnitService } from '../data/api'
import { formSchema, type StockUnit } from '../data/schema'
import type { StockUnitForm } from '../types/types'
import QuantityTypeSelect from './quantity_type-select'
import VoucherCategoryDropdown from './stock_unit-dropdown'





interface Props {
  currentRow?: StockUnit
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StockUnitActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateStockUnit = useMutation({
    mutationFn: async (data: StockUnitForm) => {
      // Here you would typically make an API call to save the account group
      // For example:
      console.log('Saving account group:', data);
      if (isEdit && currentRow) {
        return await updateStockUnitService({ ...data, id: currentRow.id })
      }
      else if (!isEdit) {
        return await storeStockUnitService(data);
      }
    },
    onSuccess: (data) => {
      console.log(data, 'Stock Unit saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['StockUnits'] })
    },
  })

  const form = useForm<StockUnitForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow, isEdit,
      }
      : {
        name: '',
        code: '',
        description: '',
        status: 'active',
        isEdit,
      },
  })

  const onSubmit = (values: StockUnitForm) => {

    form.reset()
    showSubmittedData(values)
    mutateStockUnit.mutate(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left border-b-2 pb-2'>
          <DialogTitle>{isEdit ? 'Edit Stock Unit' : 'Add New Stock Unit'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the Stock Unit here. ' : 'Create new Stock Unit here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormInputField type='text' form={form} name='name' label='Name' />
              <FormInputField type='text' form={form} name='code' label='Code' />
              <VoucherCategoryDropdown form={form} />
              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />
              <QuantityTypeSelect form={form} />




            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
