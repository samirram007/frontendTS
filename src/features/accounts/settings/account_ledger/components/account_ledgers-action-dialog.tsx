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

import { formSchema, type AccountLedger } from '@/features/accounts/settings/account_ledger/data/schema'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'

import FormInputField from '@/components/form-input-field'
import { storeAccountLedgerService, updateAccountLedgerService } from '../data/api'
import type { AccountLedgerForm } from '../types/types'
import AccountGroupDropdown from './account_group-dropdown'





interface Props {
  currentRow?: AccountLedger
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountLedgersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const queryClient = useQueryClient()
  const mutateAccountLedger = useMutation({
    mutationFn: async (data: AccountLedgerForm) => {
      // Here you would typically make an API call to save the account group
      // For example:
      if (isEdit && currentRow) {
        return await updateAccountLedgerService({ ...data, id: currentRow.id })
      }
      else if (!isEdit) {
        return await storeAccountLedgerService(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountLedgers'] })
    },
  })

  const form = useForm<AccountLedgerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        ...currentRow, isEdit,
      }
      : {
        name: '',
        code: '',
        description: '',
        accountGroupId: 1,
        status: 'active',
        isEdit,
      },
  })

  const onSubmit = (values: AccountLedgerForm) => {
    values.accountGroupId = Number(values.accountGroupId)
    form.reset()
    showSubmittedData(values)
    mutateAccountLedger.mutate(values)
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
          <DialogTitle>{isEdit ? 'Edit Account Ledger' : 'Add New Account Ledger'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the account ledger here. ' : 'Create new account ledger here. '}
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
              <AccountGroupDropdown form={form} />
              <FormInputField type='textarea' form={form} name='description' label='Description (optional)' />



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
