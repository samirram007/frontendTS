'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { lowerCase } from '@/utils/removeEmptyStrings'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { storeStateService, updateStateService } from '../data/api'
import { formSchema, type State, type StateForm } from '../data/schema'
import CountryDropdown from './country-dropdown'
interface Props {
    currentRow?: State
}
export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const queryClient = useQueryClient()
    const mutateState = useMutation({
        mutationFn: async (data: StateForm) => {
            // Here you would typically make an API call to save the State
            // For example:
            console.log('Saving State:', data);
            if (isEdit && currentRow) {
                return await updateStateService({ ...data, id: currentRow.id })
            }
            else if (!isEdit) {
                return await storeStateService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, 'State saved successfully!')
            queryClient.invalidateQueries({ queryKey: ['states'] })
        },
    })

    const form = useForm<StateForm, any, StateForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow, isEdit,
            }
            : {
                name: '',
                code: '',
                gstCode: '',
                countryId: 76,
                isEdit,
            },
    })
    //  const stateStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

    const moduleName = "State"
    const onSubmit = (values: StateForm) => {
        form.reset()
        showSubmittedData(values)
        mutateState.mutate(values)
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
                        <FormInputField type='text' form={form} name='gstCode' label='GST Code' />
                        <CountryDropdown form={form} />

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