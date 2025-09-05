import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(auth)/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/profile"!</div>
}
