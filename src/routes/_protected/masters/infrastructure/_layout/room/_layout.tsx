import AppErrorComponent from '@/components/error-component'
import RoomProvider from '@/features/modules/room/context/room-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/room/_layout',
)({
  component: () => {
    return (
      <RoomProvider>
        <Outlet />
      </RoomProvider>
    )
  },
  errorComponent: () => <AppErrorComponent />,
  pendingComponent: () => <Loader className='animate-spin' />
})
