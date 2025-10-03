'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Route as SupplierRoute } from '@/routes/_authenticated/masters/party/_layout/supplier/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSupplierMutation } from '../data/queryOptions'
import { formSchema, type Supplier, type SupplierForm } from '../data/schema'
import AccountGroupDropdown from './sub-component/account_group-dropdown'
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
                supplierTypeId: 1,
                address: '',
                phoneNo: '',
                email: '',
                website: '',
                gstNo: '',
                panNo: '',
                tanNo: '',
                cinNo: '',
                currencyId: 1,
                countryId: 1,
                stateId: 1,
                city: '',
                zipCode: '',
                isEdit,
            },
    })
    //  const supplierStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

    const moduleName = "Supplier"
    const onSubmit = (values: SupplierForm) => {
        form.reset()
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

            <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
                <Form {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 p-0.5'
                    >
                        <FormInputField type='text' form={form} name='name' label='Name' />
                        <FormInputField type='text' form={form} name='code' label='Code' />
                        <FormInputField type='text' form={form} name='gstin' label='Gst Number' />
                        <FormInputField type='text' form={form} name='pan' label='Pan Number' />
                        <FormInputField type='text' form={form} name='contactPerson' label='Contact Person' />
                        <FormInputField type='text' form={form} name='contactNumber' label='Contact Number' />
                        <FormInputField type='text' form={form} name='phone' label='Phone Number' />
                        <FormInputField type='text' form={form} name='email' label='Email' />
                        <AddressForm form={form} />
                        <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]} />

                        <AccountGroupDropdown form={form} />

                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button type='submit' form='user-form' disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Saving..." : "Save changes"}
                </Button>
            </DialogFooter>
        </Dialog>
    )
}