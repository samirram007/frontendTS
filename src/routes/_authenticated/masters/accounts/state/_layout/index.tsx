
import { stateQueryOptions } from '@/features/accounts/settings/state/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
const State = React.lazy(() =>
  import('@/features/accounts/settings/state')
)

export const Route = createFileRoute('/_authenticated/masters/accounts/state/_layout/',)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(stateQueryOptions()),
  component: () => {
    const { data: state } = useSuspenseQuery(stateQueryOptions())
    return (
      <Suspense fallback={<Loader className="animate-spin" />}>

        <State data={state?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading state data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})