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

import type { DeliveryRoute, DeliveryRouteForm } from '@/features/modules/delivery_route/data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormInputField from '@/components/form-input-field'
import { useForm, type Resolver } from 'react-hook-form'
import { lowerCase } from '../../../../utils/removeEmptyStrings'
import { storeDeliveryRouteService, updateDeliveryRouteService } from '../data/api'
import { formSchema } from '../data/schema'

import DeliveryPlaceDropdown from './delivery_place-dropdown'
import { use } from 'react'
import { useDeliveryRouteMutation } from '../data/queryOptions'
import { toast } from 'sonner'


interface Props {
  currentRow?: DeliveryRoute
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const { mutate: mutateDeliveryRoute, isPending } = useDeliveryRouteMutation()

  const form = useForm<DeliveryRouteForm>({
    resolver: zodResolver(formSchema) as Resolver<DeliveryRouteForm>,
    defaultValues: isEdit
      ? {
        ...currentRow, isEdit,
      }
      : {
        sourcePlaceId: undefined,
        destinationPlaceId: undefined,
        distanceKm: undefined,
        estimatedTimeInMinutes: undefined,
        rate: undefined,
        isEdit,
      },
  })
  //const deliveryRouteStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

  const moduleName = "Account Nature"
  const onSubmit = (values: DeliveryRouteForm) => {
    if (isPending) return;
    if (values.sourcePlaceId === values.destinationPlaceId) {
      toast.error("Source and Destination places cannot be the same.");
      return;
    }
    if (isEdit) {
      mutateDeliveryRoute(values)
      onOpenChange(false)
      return;
    }

    form.reset()
    showSubmittedData(values)
    mutateDeliveryRoute(values)
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
        <div className='-mr-4 h-105 w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <DeliveryPlaceDropdown form={form} gapClass='grid grid-cols-[110px_1fr]' name="sourcePlaceId" />
              <DeliveryPlaceDropdown form={form} gapClass='grid grid-cols-[110px_1fr]' name="destinationPlaceId" />
              <FormInputField type='number' form={form} name='distanceKm' label='Distance (Km)' />
              <FormInputField type='number' form={form} name='estimatedTimeInMinutes' label='Estimated Time (Minutes)' />
              <FormInputField type='number' form={form} name='rate' label='Rate' />

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
