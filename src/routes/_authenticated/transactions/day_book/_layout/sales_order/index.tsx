import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/day_book/_layout/sales_order/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/transactions/vouchers/_layout/sales_order/"!
    </div>
  )
}
