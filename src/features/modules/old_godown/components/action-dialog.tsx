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


import { zodResolver } from '@hookform/resolvers/zod'

import FormInputField from '@/components/form-input-field'
import { useForm } from 'react-hook-form'
import { lowerCase } from '../../../../utils/removeEmptyStrings'

import { showSubmittedData } from '@/utils/show-submitted-data'
import { Loader2 } from 'lucide-react'
import { useStorageUnitMutation } from '../data/queryOptions'
import { formSchema, type StorageUnit, type StorageUnitForm } from '../data/schema'
import AddressForm from './sub-component/address-form'
import StorageUnitDropdown from './dropdown/storage-unit-dropdown'


interface Props {
  currentRow?: StorageUnit
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { mutate: saveStorageUnit, isPending } = useStorageUnitMutation()
  const isEdit = !!currentRow
  const form = useForm({
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
        storageUnitType: undefined,
        storageUnitCategory: undefined,
        address: undefined,

        ourStockWithThirdParty: false,
        thirdPartyStockWithUs: false,

        isVirtual: false,
        isMobile: false,

        capacityValue: 0,
        capacityUnitId: 0,

        temperatureMin: 0,
        temperatureMax: 0,

        parentId: 1,
        isEdit,
      },
  })

  const gapClass = 'grid grid-cols-[120px_1fr] gap-4'

  const moduleName = "StorageUnit"
  const onSubmit = (values: StorageUnitForm) => {
    console.log(values)
    form.reset()
    showSubmittedData(values)
    saveStorageUnit(
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
      <DialogContent className='sm:max-w-lg md:max-w-8/12 lg:max-w-6/12 '>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
          <DialogDescription>
            {isEdit ? `Update the ${lowerCase(moduleName)} here. `
              : `Create new ${lowerCase(moduleName)} here. `}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-full w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-4'>
                  <h6 className=" font-semibold text-md  ">GENERAL</h6>
                  <FormInputField type='text' gapClass={gapClass} form={form} name='name' label='Name' />
                  <FormInputField type='text' gapClass={gapClass} form={form} name='code' label='Code' />
                  <StorageUnitDropdown form={form} gapClass={gapClass} />

                  <FormInputField type='textarea' gapClass={gapClass} form={form} name='description' label='Description (optional)' />
                  <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]} />
                </div>
                <div className='space-y-4'>
                  <AddressForm form={form} />

                </div>
              </div>

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
