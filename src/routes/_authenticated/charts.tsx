import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/charts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/charts"!</div>
}
