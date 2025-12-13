import RefundDashboard from '@/features/modules/booking/features/Refunds/Refund'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/transactions/booking/_layout/refunds/',
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <RefundDashboard />
        </>
    )
}
