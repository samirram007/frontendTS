import PatientProvider from '@/features/modules/booking/contexts/patient-context'
// import AgentProvider from '@/features/modules/booking/features/NewBooking/features/AgentFeature/context/agent-context'
import Booking from '@/features/modules/booking/pages/BookingDashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/transactions/booking/')({
  component: BookingProvider,
})


function BookingProvider(){
  return(
    <PatientProvider>
        <Booking/>
    </PatientProvider>
 
  )
}
