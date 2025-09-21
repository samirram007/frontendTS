'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Route as CountryRoute } from '@/routes/_authenticated/masters/accounts/country/_layout'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { storeCountryService, updateCountryService } from '../data/api'
import { formSchema, type Country, type CountryForm } from '../data/schema'
interface Props {
    currentRow?: Country
}
export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const mutateCountry = useMutation({
        mutationFn: async (data: CountryForm) => {
            // Here you would typically make an API call to save the Country
            // For example: 
            if (isEdit && currentRow) {
                return await updateCountryService({ ...data, id: currentRow.id })
            }
            else if (!isEdit) {
                return await storeCountryService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, 'Country saved successfully!')
            queryClient.invalidateQueries({ queryKey: ['countrys'] })
        },
    })

    const form = useForm<CountryForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow, isEdit,
            }
            : {
                name: '',
                isoCode: '',
                phoneCode: '',
                isEdit,
            },
    })
    //  const countryStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

    const moduleName = "Country"
    const onSubmit = (values: CountryForm) => {
        form.reset()
        // showSubmittedData(values)
        mutateCountry.mutate(values)
        navigate({ to: CountryRoute.to })
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
                        <FormInputField type='text' form={form} name='phoneCode' label='Phone Code' />
                        <FormInputField type='text' form={form} name='isoCode' label='Iso Code' />




                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button type='submit' form='user-form'>
                    Save changes
                </Button>
            </DialogFooter>
        </Dialog>
    )
}