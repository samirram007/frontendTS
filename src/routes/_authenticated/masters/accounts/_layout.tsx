import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Accounts from '@/features/masters/accounts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/masters/accounts/_layout',
)({
    component: Accounts,
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError,
})


