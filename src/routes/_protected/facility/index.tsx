import Facility from '@/features/modules/facility'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/facility/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <><Facility/></>
}
