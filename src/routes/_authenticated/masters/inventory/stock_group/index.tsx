import StockGroup from '@/features/inventory/settings/stock_group';
import { stockGroupQueryOptions } from '@/features/inventory/settings/stock_group/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_authenticated/masters/inventory/stock_group/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(stockGroupQueryOptions()),
  component: () => {
    const { data: stockGroup } = useSuspenseQuery(stockGroupQueryOptions())
    console.log(stockGroup, 'stock category data');
    return <StockGroup data={stockGroup?.data} />
  },
  errorComponent: () => <div>Error loading stock category data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

