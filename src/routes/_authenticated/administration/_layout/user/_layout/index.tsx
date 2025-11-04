
import { userQueryOptions } from '@/features/modules/user/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
const User = React.lazy(() =>
  import('@/features/modules/user')
)

export const Route = createFileRoute('/_authenticated/administration/_layout/user/_layout/',)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(userQueryOptions()),
  component: () => {
    const { data: user } = useSuspenseQuery(userQueryOptions())
    return (
      <Suspense fallback={<Loader className="animate-spin" />}>

        <User data={user?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading user data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})