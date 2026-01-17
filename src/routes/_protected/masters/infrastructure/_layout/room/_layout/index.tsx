import { roomQueryOptions } from '@/features/modules/room/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';

const Room = React.lazy(() => import('@/features/modules/room'));

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/room/_layout/',
)({
  loader: ({ context }) => context.queryClient.ensureQueryData(roomQueryOptions()),
  component: () => {
    const { data: room } = useSuspenseQuery(roomQueryOptions());

    return (
      <Suspense fallback={<Loader className='animate-spin' />}>
        <Room data={room?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading company data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})
