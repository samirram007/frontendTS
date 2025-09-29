import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/vouchers/_layout/rejection_in/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/_authenticated/transactions/vouchers/_layout/rejection_in/"!
    </div>
  )
}
