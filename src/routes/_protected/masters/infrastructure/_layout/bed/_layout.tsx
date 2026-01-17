import AppErrorComponent from '@/components/error-component'
import BedProvider from '@/features/modules/bed/context/bed-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/bed/_layout',
)({
  component: () => {
    return (
      <BedProvider>
        <Outlet />
      </BedProvider>
    )
  },
  errorComponent: () => <AppErrorComponent />,
  pendingComponent: () => <Loader className='animate-spin' />
})