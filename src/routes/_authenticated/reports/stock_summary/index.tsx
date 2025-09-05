import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/stock_summary/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reports/stock_summery/"!</div>
}
