'use client'

import { SelectDropdown } from '@/components/select-dropdown'
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { storeAccountNatureService, updateAccountNatureService } from '@/features/accounts/services/apis'
import type { accountingEffects, AccountNature, accountNatureStatus } from '@/features/accounts/settings/account_nature/data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import FormInputField from '@/components/form-input-field'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { capitalizeAllWords } from '../../../../../utils/removeEmptyStrings'

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' }),
    code: z
      .string()
      .min(1, { message: 'Role is required.' }),
    status: z
      .string()
      .min(1, { message: 'Status is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    accountingEffect: z
      .string()
      .min(1, { message: 'Accounting effect is required.' })
      .optional(),
    isEdit: z.boolean(),
  })

type AccountNatureForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: AccountNature
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountNaturesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateAccountNature = useMutation({
    mutationFn: async (data: AccountNatureForm) => {
      // Here you would typically make an API call to save the account nature
      // For example:
      console.log('Saving account nature:', data);
      if (isEdit && currentRow) {
        return await updateAccountNatureService({ ...data, id: currentRow.id })

        // await queryClient.invalidateQueries({
        //   queryKey: ['accountNatures', { id: currentRow.id }],
        // })
        // return { ...currentRow, ...data }
      }
      else if (!isEdit) {
        return await storeAccountNatureService(data);
      }
    },
    onSuccess: (data) => {
      console.log(data, 'Account Nature saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['accountNatures'] })
      // queryClient.setQueryData(['accountNatures', { id: currentRow.id }], data)
      // showSubmittedData(data, 'Account Nature saved successfully!')
    },
  })

  const form = useForm<AccountNatureForm>({
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
        accountingEffect: 'debit',
        isEdit,
      },
  })
  const accountNatureStatusOptions: accountNatureStatus[] = ['active', 'inactive'];
  const accountEffectOptions: accountingEffects[] = ['debit', 'credit'];
  const onSubmit = (values: AccountNatureForm) => {
    form.reset()
    showSubmittedData(values)
    mutateAccountNature.mutate(values)
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
          <DialogTitle>{isEdit ? 'Edit Account Nature' : 'Add New Account Nature'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the account nature here. ' : 'Create new account nature here. '}
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
              <FormField
                control={form.control}
                name='accountingEffect'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Accounting Effect
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select an accounting effect'
                      className='col-span-4'
                      items={accountEffectOptions.map((value) => ({
                        label: capitalizeAllWords(value),
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />
              <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]} />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Status
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a status'
                      className='col-span-4'
                      items={accountNatureStatusOptions.map((value) => ({
                        label: capitalizeAllWords(value),
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
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
