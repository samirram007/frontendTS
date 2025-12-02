import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/reports/balance_sheet/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/reports/balance_sheet/"!</div>
}
