import PatientProvider from '@/features/modules/patient/contexts/patient-contexts'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/masters/party/_layout/patient/_layout',
)({
  component: () => {
    //const { data: supplier } = useSuspenseQuery(supplierQueryOptions())
    return (
      <PatientProvider>
        <Outlet />
      </PatientProvider>
    )
  },
  errorComponent: () => (
    <div>
      {' '}
      <span className="bg-red-400  ">Layout:</span> Error loading patient
      data[].{' '}
    </div>
  ),
  pendingComponent: () => <Loader className="animate-spin" />,
})
