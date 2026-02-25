// import OrderBook from '@/features/modules/voucher/day_book'
import Orderbook from '@/features/modules/voucher/order_book'
import { orderBookQueryOptions } from '@/features/modules/voucher/order_book/data/queryOptions'
// import { orderBookQueryOptions } from '@/features/modules/voucher/day_book/data/queryOptions'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { Suspense } from 'react'

export const Route = createFileRoute('/_protected/reports/order_book/_layout/')(
  {
    loader: ({ context }) =>
      context.queryClient.ensureQueryData(orderBookQueryOptions()),
    component: () => {
      const { data: orderbook } = useSuspenseQuery(orderBookQueryOptions())
      console.log('OrderBook Data: ', orderbook)
      return (
        <Suspense fallback={<Loader className="animate-spin" />}>
          <Orderbook data={orderbook?.data} />
        </Suspense>
      )
    },
    errorComponent: () => <div>Error loading day Book data.</div>,
    pendingComponent: () => <Loader className="animate-spin" />,
  },
)
