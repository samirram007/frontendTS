import PatientProvider from '@/features/modules/booking/contexts/patient-context';
import AgentProvider from '@/features/modules/booking/features/NewBooking/features/AgentFeature/context/agent-context';
import LabTestItemProvider from '@/features/modules/booking/features/NewBooking/features/LabTestsFeature/context/lab-test-context';
import PhysicianProvider from '@/features/modules/booking/features/NewBooking/features/PhysicianFeature/context/physician-context';
import NewBooking from '@/features/modules/booking/pages/NewBooking'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/create-booking',
)({
  component: NewBookingProvider,
});



function NewBookingProvider() {
  return (
    <PatientProvider>
      <AgentProvider>
        <PhysicianProvider>
          <LabTestItemProvider>
            <NewBooking />
          </LabTestItemProvider>
        </PhysicianProvider>
      </AgentProvider>
    </PatientProvider>
  )
}