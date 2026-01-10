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
import { Form } from '@/components/ui/form'

import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormInputField from '@/components/form-input-field'
import { useForm } from 'react-hook-form'
import { lowerCase } from '../../../../utils/removeEmptyStrings'

import {
  formSchema,
  type DeliveryVehicle,
  type DeliveryVehicleForm,
} from '../data/schema'

import {
  storeDeliveryVehicleService,
  updateDeliveryVehicleService,
} from '../data/api'
import { Label } from '@/components/ui/label'
import { VehicleTypeSelector } from './vehicle-type-selector'
import { useGlobalContext } from '@/features/global/contexts/global-context'
import { useEffect } from 'react'
import { TransporterSelector } from '../../voucher/freight/components/voucher-dispatch-detail02/transporter-selector'

interface Props {
  currentRow?: DeliveryVehicle
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
  console.log('ActionDialog rendered, open:', open)

  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateVehicle = useMutation({
    mutationFn: async (data: DeliveryVehicleForm) => {
      // Here you would typically make an API call to save the account nature
      // For example:
      console.log('Saving account nature:', data)
      if (isEdit && currentRow) {
        return await updateDeliveryVehicleService({
          ...data,
          id: currentRow.id,
        })
      } else if (!isEdit) {
        return await storeDeliveryVehicleService(data)
      }
    },
    onSuccess: () => {
      //console.log(data, 'Account Nature saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['delivery_vehicles'] })
      form.reset()
      form.resetField('isEdit')
      form.setFocus('vehicleNumber')
    },
  })

  const { transporter } = useGlobalContext()

  const form = useForm<DeliveryVehicleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? { ...currentRow, isEdit }
      : {
          transporterName: transporter?.name ?? '',
          vehicleType: 'truck',
          vehicleNumber: '',
          driverName: '',
          driverContact: '',
          capacity: '',
          description: '',
          status: 'active',
          isEdit,
        },
  })

  useEffect(() => {
    if (!open) return
    console.log(transporter?.name)

    if (!transporter?.name) return

    form.setValue('transporterName', transporter.name, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    })
  }, [open, transporter])

  const moduleName = 'Delivery Vehicle'
  const onSubmit = (values: DeliveryVehicleForm) => {
    console.log(values)
    showSubmittedData(values)
    mutateVehicle.mutate(values)
    form.reset()
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
        <div className="-mr-4 h-full w-full overflow-y-auto    py-1 pr-4">
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <div className="grid grid-cols-[150px_1fr] gap-2">
                <Label className="mb-2 block text-sm font-medium">
                  Transporter
                </Label>
                <TransporterSelector form={form} name="transporterName" />
              </div>

              <div className="grid grid-cols-[150px_1fr] gap-2">
                <Label className="mb-2 block text-sm font-medium">
                  Vehicle Type
                </Label>
                <VehicleTypeSelector form={form} />
              </div>

              <FormInputField
                type="text"
                gapClass="grid-cols-[150px_1fr] gap-2"
                form={form}
                name="vehicleNumber"
                label="Vehicle Number"
              />
              {/* <FormInputField type='text' gapClass='grid-cols-[150px_1fr] gap-2' form={form} name='driverName' label='Driver Name' />
              <FormInputField type='text' gapClass='grid-cols-[150px_1fr] gap-2' form={form} name='driverContact' label='Driver Contact' /> */}

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
          <Button
            type="submit"
            form="user-form"
            disabled={mutateVehicle.isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import { Form } from '@/components/ui/form'

// import { showSubmittedData } from '@/utils/show-submitted-data'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useMutation, useQueryClient } from '@tanstack/react-query'

// import FormInputField from '@/components/form-input-field'
// import { useForm } from 'react-hook-form'
// import { lowerCase } from '../../../../utils/removeEmptyStrings'

// import {
//   formSchema,
//   type DeliveryVehicle,
//   type DeliveryVehicleForm,
// } from '../data/schema'

// import {
//   storeDeliveryVehicleService,
//   updateDeliveryVehicleService,
// } from '../data/api'

// import { TransporterSelector } from './transporter-select'
// import { VehicleTypeSelector } from './vehicle-type-selector'
// import { Label } from '@/components/ui/label'
// import { useGlobalContext } from '@/features/global/contexts/global-context'
// import { useEffect } from 'react'

// interface Props {
//   currentRow?: DeliveryVehicle
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function ActionDialog({ currentRow, open, onOpenChange }: Props) {
//   const isEdit = !!currentRow
//   const queryClient = useQueryClient()
//   const { transporter } = useGlobalContext()

//   const form = useForm<DeliveryVehicleForm>({
//     resolver: zodResolver(formSchema),
//     defaultValues: isEdit
//       ? { ...currentRow, isEdit }
//       : {
//           transporterName: '',
//           vehicleType: 'truck',
//           vehicleNumber: '',
//           driverName: '',
//           driverContact: '',
//           capacity: '',
//           description: '',
//           status: 'active',
//           isEdit,
//         },
//   })

//   const mutateVehicle = useMutation({
//     mutationFn: async (data: DeliveryVehicleForm) => {
//       if (isEdit && currentRow) {
//         return updateDeliveryVehicleService({
//           ...data,
//           id: currentRow.id,
//         })
//       }
//       return storeDeliveryVehicleService(data)
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['delivery_vehicles'] })
//       form.reset()
//       form.setFocus('vehicleNumber')
//     },
//   })

//   /**
//    * 🔑 IMPORTANT
//    * Prefill transporter name when dialog opens
//    * (same logic as VoucherDispatchDetail02)
//    */
//   useEffect(() => {
//     if (!open) return

//     form.reset({
//       ...(isEdit ? currentRow : {}),
//       transporterName: transporter?.name ?? '',
//       vehicleType: isEdit ? currentRow?.vehicleType : 'truck',
//       vehicleNumber: isEdit ? currentRow?.vehicleNumber : '',
//       driverName: isEdit ? currentRow?.driverName : '',
//       driverContact: isEdit ? currentRow?.driverContact : '',
//       capacity: isEdit ? currentRow?.capacity : '',
//       description: isEdit ? currentRow?.description : '',
//       status: isEdit ? currentRow?.status : 'active',
//       isEdit,
//     })
//   }, [open, transporter])

//   const moduleName = 'Delivery Vehicle'

//   const onSubmit = (values: DeliveryVehicleForm) => {
//     showSubmittedData(values)
//     mutateVehicle.mutate(values)
//     onOpenChange(false)
//   }

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(state) => {
//         form.reset()
//         onOpenChange(state)
//       }}
//     >
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader className="text-left">
//           <DialogTitle>
//             {isEdit ? 'Edit ' : 'Add New '} {moduleName}
//           </DialogTitle>
//           <DialogDescription>
//             {isEdit
//               ? `Update the ${lowerCase(moduleName)} here. `
//               : `Create new ${lowerCase(moduleName)} here. `}
//             Click save when you&apos;re done.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="-mr-4 h-full w-full overflow-y-auto py-1 pr-4">
//           <Form {...form}>
//             <form
//               id="user-form"
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4 p-0.5"
//             >
//               <div className="grid grid-cols-[150px_1fr] gap-2">
//                 <Label className="text-sm font-medium">Transporter</Label>
//                 <TransporterSelector form={form} name="transporterName" />
//               </div>

//               <div className="grid grid-cols-[150px_1fr] gap-2">
//                 <Label className="text-sm font-medium">Vehicle Type</Label>
//                 <VehicleTypeSelector form={form} />
//               </div>

//               <FormInputField
//                 type="text"
//                 gapClass="grid-cols-[150px_1fr] gap-2"
//                 form={form}
//                 name="vehicleNumber"
//                 label="Vehicle Number"
//               />

//               <FormInputField
//                 type="checkbox"
//                 form={form}
//                 name="status"
//                 label="Status"
//                 options={[
//                   { label: 'Active', value: 'active' },
//                   { label: 'Inactive', value: 'inactive' },
//                 ]}
//               />
//             </form>
//           </Form>
//         </div>

//         <DialogFooter>
//           <Button
//             type="submit"
//             form="user-form"
//             disabled={mutateVehicle.isPending}
//           >
//             Save changes
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
