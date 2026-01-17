import { floorQueryOptions } from '@/features/modules/floor/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';



const Floor = React.lazy(() => import('@/features/modules/floor'));



export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/floor/_layout/',
)({
  loader: ({ context }) => context.queryClient.ensureQueryData(floorQueryOptions()),
  component: () => {
    const { data: floor } = useSuspenseQuery(floorQueryOptions());

    return (
      <Suspense fallback={<Loader className='animate-spin' />}>
        <Floor data={floor?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading company data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

