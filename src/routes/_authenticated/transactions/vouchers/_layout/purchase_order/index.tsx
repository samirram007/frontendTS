import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/vouchers/_layout/purchase_order/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/transactions/vouchers/_layout/purchase_order/"!
    </div>
  )
}
