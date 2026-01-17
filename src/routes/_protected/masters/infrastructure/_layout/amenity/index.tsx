import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/amenity/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/masters/infrastructure/amenity/"!</div>
}
