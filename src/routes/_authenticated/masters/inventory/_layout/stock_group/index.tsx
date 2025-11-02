import StockGroup from '@/features/modules/stock_group';
import { stockGroupQueryOptions } from '@/features/modules/stock_group/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_authenticated/masters/inventory/_layout/stock_group/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(stockGroupQueryOptions()),
  component: () => {
    const { data: stockGroup } = useSuspenseQuery(stockGroupQueryOptions())
    return <StockGroup data={stockGroup?.data} />
  },
  errorComponent: () => <div>Error loading stock group data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

