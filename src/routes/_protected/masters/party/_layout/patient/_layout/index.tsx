import { patientQueryOptions } from '@/features/modules/patient/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
const Patient = React.lazy(() => import('@/features/modules/patient'))

export const Route = createFileRoute(
  '/_protected/masters/party/_layout/patient/_layout/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(patientQueryOptions()),
  component: () => {
    const { data: patient } = useSuspenseQuery(patientQueryOptions())
    return (
      <Suspense fallback={<Loader className="animate-spin" />}>
        <Patient data={patient?.data} />
      </Suspense>
    )
  },
  errorComponent: () => <div>Error loading patient data...</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})
