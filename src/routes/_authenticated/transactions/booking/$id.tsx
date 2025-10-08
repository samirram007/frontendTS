import BookingDataProvider from '@/features/modules/booking/features/NewBooking/context/new-booking-context'
import { bookingQueryOptions } from '@/features/modules/booking/features/NewBooking/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import z from 'zod'

const BookingDetails = React.lazy(() =>
    import('@/features/modules/booking/pages/BookingDetails')
)
const paramsSchema = z.object({
  id: z.coerce.number().refine((n) => !Number.isNaN(n), {
    message: "Invalid booking ID",
  }),
})

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/$id',
)({
  params: {
    parse: (params) => paramsSchema.parse(params),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  loader: ({ context, params: { id } }) => {
    return context.queryClient.ensureQueryData(bookingQueryOptions(id))
  },
  component: () => {
    const { id } = Route.useParams()

    const { data: booking } = useSuspenseQuery(bookingQueryOptions(id))

    return (
      <Suspense fallback={<Loader className="animate-spin mx-auto" />}>
        <BookingDataProvider>
          <BookingDetails data={booking.data.data} />
        </BookingDataProvider>
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
