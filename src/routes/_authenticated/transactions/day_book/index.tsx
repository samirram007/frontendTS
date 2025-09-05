import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/day_book/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/transactions/day_book/"!</div>
}
