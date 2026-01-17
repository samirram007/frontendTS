import AppErrorComponent from '@/components/error-component';
import BuildingProvider from '@/features/modules/building/context/building-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
    '/_protected/masters/infrastructure/_layout/building/_layout',
)({
    component: () => {
        return (
            <BuildingProvider>
                <Outlet />
            </BuildingProvider>
        )
    },
    errorComponent: () => <AppErrorComponent />,
    pendingComponent: () => <Loader className='animate-spin' />
});