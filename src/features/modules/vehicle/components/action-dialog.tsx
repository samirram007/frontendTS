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

import type { Vehicle, VehicleForm } from '@/features/modules/delivery_place/data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormInputField from '@/components/form-input-field'
import { useForm } from 'react-hook-form'
import { lowerCase } from '../../../../utils/removeEmptyStrings'
import { storeVehicleService, updateVehicleService } from '../data/api'
import { formSchema } from '../data/schema'

import PlaceTypeDropdown from './place_type-dropdown'


interface Props {
  currentRow?: Vehicle
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateVehicle = useMutation({
    mutationFn: async (data: VehicleForm) => {
      // Here you would typically make an API call to save the account nature
      // For example:
      console.log('Saving account nature:', data);
      if (isEdit && currentRow) {
        return await updateVehicleService({ ...data, id: currentRow.id })
      }
      else if (!isEdit) {
        return await storeVehicleService(data);
      }
    },
    onSuccess: (data) => {
      console.log(data, 'Account Nature saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
  })

  const form = useForm<VehicleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow, isEdit,
      }
      : {
        name: '',
        code: '',
        placeType: 'destination',
        status: 'active',

        isEdit,
      },
  })
  //const vehicleStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

  const moduleName = "Account Nature"
  const onSubmit = (values: VehicleForm) => {
    form.reset()
    showSubmittedData(values)
    mutateVehicle.mutate(values)
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
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
          <DialogDescription>
            {isEdit ? `Update the ${lowerCase(moduleName)} here. `
              : `Create new ${lowerCase(moduleName)} here. `}
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
              <PlaceTypeDropdown form={form} gapClass='grid grid-cols-[110px_1fr]' />
              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />
              <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
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
