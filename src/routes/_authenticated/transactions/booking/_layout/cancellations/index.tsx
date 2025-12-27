import CancellationDashboard from '@/features/modules/booking/features/Cancellations/Cancellation'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/transactions/booking/_layout/cancellations/',
)({
    component: RouteComponent,
})


function RouteComponent() {
    return (
        <>
            <CancellationDashboard />
        </>
    )
}
