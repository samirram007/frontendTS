import { Main } from '@/layouts/components/main'
import OrderbookProvider from './contexts/order_book-context'
import { orderBookListSchema, type OrderbookList } from './data/schema'
import { GridTable } from './components/grid-table'
import { columns } from './components/columns'

interface OrderBookProps {
  data: OrderbookList
}

export default function Orderbook({ data }: OrderBookProps) {
  return (
    <OrderbookProvider>
      <Main className="min-w-full">
        <div className="mb-2 hidden flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Day Book</h2>
            <p className="text-muted-foreground">Manage your day book.</p>
          </div>
          {/* <PrimaryButtons /> */}
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GridTable
            data={orderBookListSchema.parse(data ?? [])}
            columns={columns}
            pagination={false}
          />
        </div>
      </Main>

      {/* <Dialogs /> */}
    </OrderbookProvider>
  )
}
