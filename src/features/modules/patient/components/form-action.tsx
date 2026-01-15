'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import FormInputField from '@/components/form-input-field'
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Route as PatientRoute } from '@/routes/_protected/masters/party/_layout/patient/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm, type Resolver } from 'react-hook-form'
import { usePatientMutation } from '../data/queryOptions'
import { formSchema, type Patient, type PatientForm } from '../data/schema'
import AddressForm from './sub-component/address-form'
import FormSelectField from './dropdown/form-select-field'

interface Props {
  currentRow?: Patient
}

const bloodGroupOptions = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
]
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]
export function FormAction({ currentRow }: Props) {
  const isEdit = !!currentRow
  const navigate = useNavigate()

  const { mutate: savePatient, isPending } = usePatientMutation()

  const form = useForm<PatientForm>({
    resolver: zodResolver(formSchema) as Resolver<PatientForm>,
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
          hasUserAccount: currentRow?.user ? true : false,
        }
      : {
          name: '',
          address: {
            line1: '',
            line2: '',
            landmark: '',
            postOffice: 'rathbari',
            district: 'Malda',
            countryId: 76,
            stateId: 36,
            city: 'Malda',
            zipCode: '',
            isPrimary: true,
            addressable: {
              addressableId: null,
              addressableType: '',
            },
          },
          dob: null,
          email: '',
          contactNo: '',
          bloodGroup: null,
          gender: null,
          status: 'active',

          image: '4',

          isEdit,
        },
  })
  //  const patientStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];
  const gapClass = 'grid grid-cols-[120px_1fr] gap-4'
  const moduleName = 'Patient'
  const onSubmit = (values: PatientForm) => {
    console.log('here: ', values)

    form.reset()
    savePatient(currentRow ? { ...values, id: currentRow.id! } : values, {
      onSuccess: () => {
        navigate({ to: PatientRoute.to })
      },
    })
  }

  return (
    <Dialog>
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

      <div className="  h-full max-w-full  overflow-y-auto py-1  ">
        <Form {...form}>
          <form
            id="user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-0.5"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-4">
                <h3 className=" font-semibold text-md  ">Bio</h3>
                <FormInputField
                  type="text"
                  gapClass={gapClass}
                  form={form}
                  name="name"
                  label="Name"
                />

                <FormInputField
                  type="text"
                  gapClass={gapClass}
                  form={form}
                  name="email"
                  label="Email"
                />

                <FormSelectField
                  className={gapClass}
                  options={genderOptions}
                  form={form}
                  name="gender"
                  label="Gender"
                />
                <FormSelectField
                  className={gapClass}
                  options={bloodGroupOptions}
                  form={form}
                  name="bloodGroup"
                  label="Blood Group"
                />
                <FormInputField
                  type="date"
                  gapClass={gapClass}
                  form={form}
                  name="dob"
                  label="DOB"
                />

                <FormInputField
                  type="text"
                  gapClass={gapClass}
                  form={form}
                  name="contactNo"
                  label="Contact Number"
                />
              </div>
              <div className="space-y-4">
                <AddressForm form={form} />
                <DialogFooter className="flex flex-row justify-end! py-4 border-t-2 border-orange-900/50 max-w-full w-full text-center">
                  <Button
                    type="submit"
                    className="self-center"
                    form="user-form"
                    disabled={isPending}
                  >
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPending ? 'Saving...' : 'Save changes'}
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Dialog>
  )
}
