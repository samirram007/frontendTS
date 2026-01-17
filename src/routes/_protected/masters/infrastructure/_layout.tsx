import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Infrastructure from '@/features/masters/infrastructure'
import InfrastructureProvider from '@/features/masters/infrastructure/context/infrastructure-context'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_protected/masters/infrastructure/_layout',
)({
    component: () => {
        return (
            <InfrastructureProvider>
                <Infrastructure />
            </InfrastructureProvider>
        )
    },
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError
})
