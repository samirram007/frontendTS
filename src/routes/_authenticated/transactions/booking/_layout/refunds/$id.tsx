import { bookingRefundOptions } from '@/features/modules/booking/features/Refunds/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import { z } from "zod";

const RefundDetail = React.lazy(() => import("@/features/modules/booking/features/Refunds/components/refund-detail"));

const paramsSchema = z.object({
    id: z.string().min(1, "Invalid booking ID"),
})


export const Route = createFileRoute(
    '/_authenticated/transactions/booking/_layout/refunds/$id',
)({
    params: {
        parse: (params) => paramsSchema.parse(params),
        stringify: ({ id }) => ({ id }),
    },
    loader: ({ context, params: { id } }) => {
        return context.queryClient.ensureQueryData(bookingRefundOptions(id))
    },
    component: () => {
        const { id } = Route.useParams();

        const { data: refund } = useSuspenseQuery(bookingRefundOptions(id));

        return (
            <Suspense fallback={<Loader className="animate-spin mx-auto" />}>
                <RefundDetail data={refund.data.data} />
            </Suspense>
        )
    },
    errorComponent: () => (
        <div className="text-red-500 text-center p-4">
            Failed to load booking details.
        </div>
    ),

    pendingComponent: () => <Loader className="animate-spin mx-auto" />,
});