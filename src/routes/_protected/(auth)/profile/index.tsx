import { Profile } from '@/features/auth/profile/components/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/(auth)/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile/>
}
