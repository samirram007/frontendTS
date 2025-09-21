'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Route as CompanyRoute } from '@/routes/_authenticated/masters/accounts/company/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCompanyMutation } from '../data/queryOptions'
import { formSchema, type Company, type CompanyForm } from '../data/schema'
import CompanyTypeDropdown from './company_type-dropdown'
interface Props {
    currentRow?: Company
}
export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { mutate: saveCompany, isPending } = useCompanyMutation()

    const form = useForm<CompanyForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow, isEdit,
            }
            : {
                name: '',
                code: '',
                isEdit,
                companyTypeId: 1,
            },
    })
    //  const companyStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

    const moduleName = "Company"
    const onSubmit = (values: CompanyForm) => {
        form.reset()
        saveCompany(
            currentRow ? { ...values, id: currentRow.id! } : values,
            {
                onSuccess: () => {
                    navigate({ to: CompanyRoute.to, })
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
                        <CompanyTypeDropdown form={form} />


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