import { stockSummaryQueryOptions } from '@/features/modules/voucher/stock_summary/data/queryOptions'
import StockInHandItemInDetails from '@/features/modules/voucher/stock_summary/stock_in_hand_item_in_details/stock_in_hand_item_in_details'


import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/reports/stock_summary/_layout/stock-in-hand-item-in-details',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(stockSummaryQueryOptions('stock_in_hand_item_in_details')),
  component: () => {
    const { data: stocksummary } = useSuspenseQuery(stockSummaryQueryOptions('stock_in_hand_item_in_details'))

    return <StockInHandItemInDetails data={stocksummary?.data} />
  },
  errorComponent: () => <div>Error loading stock_in_hand_item_in_details data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

