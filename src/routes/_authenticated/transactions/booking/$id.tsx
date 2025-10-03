import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/transactions/booking/$id"!</div>
}
