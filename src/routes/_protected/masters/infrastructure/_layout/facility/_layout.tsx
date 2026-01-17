import FacilityProvider from '@/features/modules/facility/contexts/facility-contexts'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
    '/_protected/masters/infrastructure/_layout/facility/_layout',
)({
    component: () => {
        return (
            <FacilityProvider>
                <Outlet />
            </FacilityProvider>
        )
    },
    errorComponent: () => <div> <span className='bg-red-400  '>Layout:</span> Error loading company data[]. </div>
    ,
    pendingComponent: () => <Loader className="animate-spin" />,
})
