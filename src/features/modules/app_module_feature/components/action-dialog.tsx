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

import { useForm } from 'react-hook-form'

import FormInputField from '@/components/form-input-field'

import { Loader2 } from 'lucide-react'
import { useAppModuleFeatureMutation } from '../data/queryOptions'
import { formSchema, type AppModuleFeature } from '../data/schema'
import type { AppModuleFeatureForm } from '../types/types'
import AppModuleDropdown from './app_module-dropdown'






interface Props {
  currentRow?: AppModuleFeature
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {

  const { mutate: saveAppModuleFeature, isPending } = useAppModuleFeatureMutation()
  const isEdit = !!currentRow

  const form = useForm<AppModuleFeatureForm>({
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
        appModuleId: undefined,
        isEdit,
      },
  })

  const onSubmit = (values: AppModuleFeatureForm) => {
    values.appModuleId = Number(values.appModuleId)
    form.reset()
    showSubmittedData(values)
    saveAppModuleFeature(
      currentRow ? { ...values, id: currentRow.id } : values
    )
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
          <DialogTitle>{isEdit ? 'Edit Stock Group' : 'Add New Stock Group'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the Stock Group here. ' : 'Create new Stock Group here. '}
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
              <AppModuleDropdown form={form} />
              <FormInputField type='text' form={form} name='name' label='Name' />
              <FormInputField type='text' form={form} name='code' label='Code' />

              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />

              <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]} />



            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
