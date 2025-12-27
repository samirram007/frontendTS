import { bookingCancellationOptions } from '@/features/modules/booking/features/Cancellations/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import { z } from "zod";



const CancellationDetail = React.lazy(() => import("@/features/modules/booking/features/Cancellations/components/cancellation-detail"))

const paramsSchema = z.object({
  id: z.string().min(1, "Invalid booking ID"),
})


export const Route = createFileRoute(
  '/_authenticated/transactions/booking/_layout/cancellations/$id',
)({
  params: {
    parse: (params) => paramsSchema.parse(params),
    stringify: ({ id }) => ({ id }),
  },
  loader: ({ context, params: { id } }) => {
    return context.queryClient.ensureQueryData(bookingCancellationOptions(id))
  },
  component: () => {
    const { id } = Route.useParams();

    const { data: refund } = useSuspenseQuery(bookingCancellationOptions(id));

    return (
      <Suspense fallback={<Loader className="animate-spin mx-auto" />}>
        <CancellationDetail data={refund.data.data} />
      </Suspense>
    )
  },
  errorComponent: () => (
    <div className="text-red-500 text-center p-4">
      Failed to load booking details.
    </div>
  ),

  pendingComponent: () => <Loader className="animate-spin mx-auto" />,
})
