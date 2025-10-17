import PatientProvider from '@/features/modules/booking/contexts/patient-context'
import BookingDetailProvider from '@/features/modules/booking/features/BookingDetails/context/booking-detail-context'
import BookingDataProvider from '@/features/modules/booking/features/NewBooking/context/new-booking-context'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/_layout',
)({
  component: BookingLayout,
})

function BookingLayout() {
  return (
    <BookingDataProvider>
        <BookingDetailProvider>
            <PatientProvider>
                <Outlet/>
            </PatientProvider>
        </BookingDetailProvider>
    </BookingDataProvider>
  )
}
