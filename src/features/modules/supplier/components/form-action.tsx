'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Route as SupplierRoute } from '@/routes/_authenticated/masters/party/_layout/supplier/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSupplierMutation } from '../data/queryOptions'
import { formSchema, type Supplier, type SupplierForm } from '../data/schema'
import AccountGroupDropdown from './dropdown/account_group-dropdown'
import AddressForm from './sub-component/address-form'

interface Props {
    currentRow?: Supplier
}
export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const navigate = useNavigate();

    const { mutate: saveSupplier, isPending } = useSupplierMutation()

    const form = useForm<SupplierForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? { ...currentRow, isEdit }
            : {
                name: '',
                code: '', 
                address: {
                    line1: '',
                    line2: '',
                    landmark: '',
                    countryId: 76,
                    stateId: 36,
                    city: 'Malda',
                    zipCode: '',
                    isPrimary: true,
                    addressable: {
                        addressableId: null,
                        addressableType: '',
                    }
                },
                email: '',
                website: '',
                gstin: '',
                pan: '',
                status: 'active',
                accountGroupId: 4,
                contactPerson: '',
                contactNo: '',
                phone: '',

                isEdit,
            },
    })
    //  const supplierStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];
    const gapClass = 'grid grid-cols-[120px_1fr] gap-4'
    const moduleName = "Supplier"
    const onSubmit = (values: SupplierForm) => {
        // console.log("here: ", values)
        // form.reset()
        saveSupplier(
            currentRow ? { ...values, id: currentRow.id! } : values,
            {
                onSuccess: () => {
                    navigate({ to: SupplierRoute.to, })
                },
            }
        )

    }


    return (


        <Dialog>

            <DialogHeader className='text-left'>
                <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
                <DialogDescription>
                    {isEdit ? `Update the ${lowerCase(moduleName)} here. `
                        : `Create new ${lowerCase(moduleName)} here. `}
                    Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>



            <div className='  h-full max-w-full  overflow-y-auto py-1  '>
                <Form {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 p-0.5'
                    >
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-4'>
                                <FormInputField type='text' gapClass={gapClass} form={form} name='name' label='Name' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='code' label='Code' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='gstin' label='Gst Number' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='pan' label='Pan Number' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='contactPerson' label='Contact Person' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='contactNo' label='Contact Number' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='phone' label='Phone Number' />
                                <FormInputField type='text' gapClass={gapClass} form={form} name='email' label='Email' />
                            </div>
                            <div className='space-y-4'>
                                <AddressForm form={form} />
                                {isEdit && form.getValues('accountLedger') ?
                                    <div className={cn(gapClass, 'items-center')}>
                                        <div>Ledger A/c: </div>
                                        <div className={cn(gapClass, 'grid-cols-1 font-bold border-2 px-2 py-1 rounded-sm')} >
                                            {form.getValues('accountLedger')?.name}
                                        </div>
                                    </div>
                                    :

                                    <AccountGroupDropdown form={form} gapClass={gapClass} />
                                }
                                <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]} />
                            </div>
                        </div>






                    </form>
                </Form>
            </div>


            <DialogFooter className='flex flex-row justify-end! py-4 border-t-2 border-orange-900/50 max-w-full w-[95%] text-center'>

                <Button type='submit' className='self-center' form='user-form'
                    disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Saving..." : "Save changes"}
                </Button>
            </DialogFooter>

        </Dialog>
    )
}