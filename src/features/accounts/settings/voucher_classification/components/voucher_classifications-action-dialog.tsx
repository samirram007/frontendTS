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

import { formSchema, type VoucherClassification } from '@/features/accounts/settings/voucher_classification/data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import FormInputField from '@/components/form-input-field'
import { storeVoucherClassificationService, updateVoucherClassificationService } from '../data/api'
import type { VoucherClassificationForm } from '../types/types'
import VoucherTypeDropdown from './voucher_type-dropdown'





interface Props {
  currentRow?: VoucherClassification
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VoucherClassificationsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateVoucherClassification = useMutation({
    mutationFn: async (data: VoucherClassificationForm) => {
      if (isEdit && currentRow) {
        return await updateVoucherClassificationService({ ...data, id: currentRow.id })
      }
      else if (!isEdit) {
        return await storeVoucherClassificationService(data);
      }
    },
    onSuccess: (data) => {
      console.log(data, 'Voucher Classification saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['voucherClassifications'] })
    },
  })

  const form = useForm<VoucherClassificationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow, isEdit,
      }
      : {
        name: '',
        code: '',
        description: '',
        voucherTypeId: 1,
        status: 'active',
        isEdit,
      },
  })

  const onSubmit = (values: VoucherClassificationForm) => {
    values.voucherTypeId = Number(values.voucherTypeId)
    form.reset()
    showSubmittedData(values)
    mutateVoucherClassification.mutate(values)
    onOpenChange(false)
  }

  console.log(form.getValues(), 'Form Values')
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Voucher Classification' : 'Add New Voucher Classification'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the voucher classification here. ' : 'Create new voucher classification here. '}
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
              <VoucherTypeDropdown form={form} />
              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />
              <FormInputField type='checkbox' form={form} name='status' label='Status'
                options={[{ label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
                ]} />

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
