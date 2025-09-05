import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/masters/accounts/company',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/accounts/settings/company_profile"!</div>
}
