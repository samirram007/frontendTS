import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reports/profit_loss/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/reports/profit_loss/"!</div>
}
