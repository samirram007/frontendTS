import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/reports/balance_sheet/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/reports/balance_sheet/"!</div>
}
