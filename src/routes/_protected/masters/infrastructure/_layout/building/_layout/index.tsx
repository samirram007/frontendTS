import Building from '@/features/modules/building'
import { buildingQueryOptions } from '@/features/modules/building/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute(
    '/_protected/masters/infrastructure/_layout/building/_layout/',
)({
    loader: ({ context }) => context.queryClient.ensureQueryData(buildingQueryOptions()),
    component: () => {
        const { data: building } = useSuspenseQuery(buildingQueryOptions())
        return (
            <Suspense fallback={<Loader className='animate-spin' />}>
                <Building data={building.data ?? []} />
            </Suspense>
        )
    },
    errorComponent: () => <ErrorComponent error={"Error Loading Data...."} />,
    pendingComponent: () => <Loader className='animate-spin' />
})