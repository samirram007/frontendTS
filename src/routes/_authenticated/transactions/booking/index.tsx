import BookingDataProvider from '@/features/modules/booking/features/NewBooking/context/new-booking-context'
import Booking from '@/features/modules/booking/pages/BookingDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/booking/')({
  component:()=> <BookingContextProvider><Booking /></BookingContextProvider>,
})

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <BookingDataProvider>
      {children}
    </BookingDataProvider>
  )
}
