import Profile from '@/features/modules/profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile/')({
  component: Profile,
})
