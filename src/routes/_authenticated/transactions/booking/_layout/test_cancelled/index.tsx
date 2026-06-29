import { createFileRoute } from '@tanstack/react-router'
import { z } from "zod";



export const Route = createFileRoute(
    '/_authenticated/transactions/booking/_layout/test_cancelled/',
)({
    validateSearch: z.any(),
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
        </>
    )
}
