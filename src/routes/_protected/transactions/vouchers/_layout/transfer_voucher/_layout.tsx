import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/transactions/vouchers/_layout/transfer_voucher/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_protected/transactions/vouchers/_layout/transfer_voucher/_layout"!
      <Outlet />
    </div>
  )
}
