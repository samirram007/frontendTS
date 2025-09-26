import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Organization from '@/features/masters/organization'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/masters/organization/_layout',
)({
    component: Organization,
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError,
})


