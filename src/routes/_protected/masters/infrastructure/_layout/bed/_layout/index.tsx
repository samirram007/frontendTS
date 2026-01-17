import { bedQueryOptions } from '@/features/modules/bed/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';

const Bed = React.lazy(() => import('@/features/modules/bed'));

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/bed/_layout/',
)({
  loader: ({ context }) => context.queryClient.ensureQueryData(bedQueryOptions()),
  component: () => {
    const { data: bed } = useSuspenseQuery(bedQueryOptions());

    return (
      <Suspense fallback={<Loader className='animate-spin' />}>
        <Bed data={bed?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading company data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
});