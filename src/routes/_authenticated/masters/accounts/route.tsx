
import Accounts from '@/features/accounts'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/accounts')({
  component: Accounts,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

