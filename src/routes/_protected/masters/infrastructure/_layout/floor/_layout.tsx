import AppErrorComponent from '@/components/error-component';
import FloorProvider from '@/features/modules/floor/context/floor-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/floor/_layout',
)({
  component: () => {
    return (
      <FloorProvider>
        <Outlet />
      </FloorProvider>
    )
  },
  errorComponent: () => <AppErrorComponent />,
  pendingComponent: () => <Loader className='animate-spin' />
});