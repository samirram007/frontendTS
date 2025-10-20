import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/day_book/_layout/stock_journal/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/transactions/vouchers/_layout/stock_journal/"!
    </div>
  )
}
