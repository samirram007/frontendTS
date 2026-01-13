'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import FormInputField from '@/components/form-input-field'
import { useForm, type Resolver } from 'react-hook-form'
import { lowerCase } from '../../../../utils/removeEmptyStrings'
import { formSchema, type Patient, type PatientForm } from '../data/schema'
import { usePatientMutation } from '../data/queryOptions'
import { addressSchema } from '../../address/data/schema'

import AddressForm from './sub-component/address-form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface Props {
  currentRow?: Patient
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { mutate: savePatient, isPending } = usePatientMutation()
  const isEdit = !!currentRow

  const form = useForm<PatientForm>({
    resolver: zodResolver(formSchema) as Resolver<PatientForm>,
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: '',
          contactNo: '',
          email: '',
          address: addressSchema,
          status: 'active',
        },
  })

  const moduleName = 'Patient'
  const onSubmit = (values: PatientForm) => {
    form.reset()
    //showSubmittedData(values)
    savePatient(currentRow ? { ...values, id: currentRow.id } : values)
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? 'Edit ' : 'Add New '} {moduleName}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Update the ${lowerCase(moduleName)} here. `
              : `Create new ${lowerCase(moduleName)} here. `}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormInputField
                type="text"
                form={form}
                name="name"
                label="Name"
              />

              <FormInputField
                type="text"
                form={form}
                name="contactNumber"
                label="Contact Number"
              />
              <FormInputField
                type="text"
                form={form}
                name="email"
                label="Email"
              />
              <AddressForm form={form} />
              <FormInputField
                type="checkbox"
                form={form}
                name="status"
                label="Status"
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
