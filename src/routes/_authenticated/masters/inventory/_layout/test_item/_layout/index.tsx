
import { testItemQueryOptions } from '@/features/modules/test_item/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
const TestItem = React.lazy(() =>
  import('@/features/modules/test_item')
)

export const Route = createFileRoute('/_authenticated/masters/inventory/_layout/test_item/_layout/',)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(testItemQueryOptions()),
  component: () => {
    const { data: testItem } = useSuspenseQuery(testItemQueryOptions())
    return (
      <Suspense fallback={<Loader className="animate-spin" />}>

        <TestItem data={testItem?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading stock item data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})