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
import { Route as CompanyRoute } from '@/routes/_protected/masters/organization/_layout/company/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCompanyMutation } from '../data/queryOptions'
import { formSchema, type Company, type CompanyForm } from '../data/schema'
import CompanyTypeDropdown from './dropdown/company_type-dropdown'
import CurrencyDropdown from './dropdown/currency-dropdown'
import AddressForm from '../sub-components/address-form'
interface Props {
  currentRow?: Company
}
export function FormAction({ currentRow }: Props) {
  const isEdit = !!currentRow
  const navigate = useNavigate()

  const { mutate: saveCompany, isPending } = useCompanyMutation()

  const form = useForm<CompanyForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? { ...currentRow, isEdit }
      : {
          name: '',
          code: '',
          mailingName: '',
          companyTypeId: 1,
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
          phoneNo: '',
          email: '',
          website: '',
          gstNo: '',
          panNo: '',
          tanNo: '',
          cinNo: '',
          currencyId: 1,
          isEdit,
        },
  })
  //  const companyStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

  const moduleName = 'Company'
  const onSubmit = (values: CompanyForm) => {
    console.log(values)

    form.reset()
    saveCompany(currentRow ? { ...values, id: currentRow.id! } : values, {
      onSuccess: () => {
        navigate({ to: CompanyRoute.to })
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

      <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
        <Form {...form}>
          <form
            id="user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-0.5"
          >
            <div className="grid grid-cols-2 items-start gap-6">
              <div className="space-y-4">
                <FormInputField
                  type="text"
                  form={form}
                  name="name"
                  label="Name"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="code"
                  label="Code"
                />
                <CompanyTypeDropdown form={form} />
                <FormInputField
                  type="text"
                  form={form}
                  name="phoneNo"
                  label="Phone No"
                />

                <FormInputField
                  type="text"
                  form={form}
                  name="email"
                  label="Email"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="website"
                  label="Website"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="gstNo"
                  label="GST No"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="panNo"
                  label="PAN No"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="tanNo"
                  label="TAN No"
                />
                <FormInputField
                  type="text"
                  form={form}
                  name="cinNo"
                  label="CIN No"
                />
                <CurrencyDropdown form={form} />
                <FormInputField
                  type="text"
                  form={form}
                  name="mailingName"
                  label="Mailing Name"
                />

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
              </div>
              <div className="space-y-4">
                <AddressForm form={form} />
              </div>
            </div>
          </form>
        </Form>
      </div>
      <DialogFooter>
        <Button type="submit" form="user-form" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Saving...' : 'Save changes'}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
