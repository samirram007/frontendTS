import BookingDetails from '@/features/modules/booking/pages/BookingDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/view',
)({
  component: BookingDetails,
})