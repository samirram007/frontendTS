import PatientProvider from '@/features/modules/booking/contexts/patient-context'
import BookingDataProvider from '@/features/modules/booking/features/NewBooking/context/new-booking-context'
import AgentProvider from '@/features/modules/booking/features/NewBooking/features/AgentFeature/context/agent-context'
import LabTestItemProvider from '@/features/modules/booking/features/NewBooking/features/LabTestsFeature/context/lab-test-context'
import PaymentProvider from '@/features/modules/booking/features/NewBooking/features/PaymentFeature/context/payment-context'
import PhysicianProvider from '@/features/modules/booking/features/NewBooking/features/PhysicianFeature/context/physician-context'
// import AgentProvider from '@/features/modules/booking/features/NewBooking/features/AgentFeature/context/agent-context'
import Booking from '@/features/modules/booking/pages/BookingDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/booking/')({
  component:()=> <BookingContextProvider><Booking /></BookingContextProvider>,
})

function BookingContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <PatientProvider>
      <AgentProvider>
        <PhysicianProvider>
          <LabTestItemProvider>
            <PaymentProvider>
              <BookingDataProvider>
                {children}
              </BookingDataProvider>
            </PaymentProvider>
          </LabTestItemProvider>
        </PhysicianProvider>
      </AgentProvider>
    </PatientProvider>
  )
}
