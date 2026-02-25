import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/reports/day_book/_layout/purchase_order/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Outlet />
  )
}
