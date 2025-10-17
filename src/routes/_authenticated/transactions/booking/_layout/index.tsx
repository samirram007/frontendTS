import PatientProvider from '@/features/modules/booking/contexts/patient-context'
import BookingDataProvider from '@/features/modules/booking/features/NewBooking/context/new-booking-context'
import Booking from '@/features/modules/booking/pages/BookingDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/booking/_layout/')({
  component:()=> <BookingContextProvider><Booking /></BookingContextProvider>,
})

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <BookingDataProvider>
      <PatientProvider>
        {children}
      </PatientProvider>
    </BookingDataProvider>
  )
}
