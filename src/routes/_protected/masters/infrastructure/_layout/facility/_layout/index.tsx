import Facility from '@/features/modules/facility'
import { facilityQueryOptions } from '@/features/modules/facility/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/facility/_layout/',
)({
  loader: ({ context }) => context.queryClient.ensureQueryData(facilityQueryOptions()),
  component: () => {
    const { data: facility } = useSuspenseQuery(facilityQueryOptions())
    return (
      <Suspense fallback={<Loader className='animate-spin' />}>
        <Facility data={facility} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading facility data....</div>,
  pendingComponent: () => <Loader className='animate-spin' />
})