import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/inventory/unit/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <div>Hello "/_authenticated/masters/inventory/unit/"!</div>
}
