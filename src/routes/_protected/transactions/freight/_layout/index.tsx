import Freight from '@/features/modules/voucher/freight';
import { freightQueryOptions } from '@/features/modules/voucher/freight/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';

export const Route = createFileRoute('/_protected/transactions/freight/_layout/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(freightQueryOptions('freight')),
  component: () => {
    const { data: freight } = useSuspenseQuery(freightQueryOptions('freight'));

    return <Freight data={freight?.data} />
  },
  errorComponent: () => <div>Error loading freight data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

