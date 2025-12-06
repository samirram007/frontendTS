
import { stockUnitQueryOptions } from '@/features/modules/stock_unit/data/queryOptions';
import Freight from '@/features/modules/voucher/freight';
import { freightQueryOptions } from '@/features/modules/voucher/freight/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute('/_protected/transactions/freight/_layout/')({
  loader: async ({ context }) => {
    const { queryClient } = context;

    const [freight, stockUnits] = await Promise.all([
      queryClient.ensureQueryData(freightQueryOptions("delivery_note")),
      queryClient.ensureQueryData(stockUnitQueryOptions())
    ]);

    return { freight, stockUnits };
  },
  component: () => {
    const { stockUnits } = Route.useLoaderData();
    const { data: freight } = useSuspenseQuery(freightQueryOptions('delivery_note'))

    return (
      <Suspense fallback={<Loader className="animate-spin" />}>
        <Freight data={freight?.data} stockUnits={stockUnits?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading freight data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})


