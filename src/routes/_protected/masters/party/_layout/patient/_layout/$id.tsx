import { patientQueryOptions } from '@/features/modules/patient/data/queryOptions'
// import PatientDetails from '@/features/accounts/settings/patient/details'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import z from 'zod'

const PatientDetails = React.lazy(
  () => import('@/features/modules/patient/details'),
)
// build queryOptions for patient
const paramsSchema = z.object({
  id: z.union([
    z.literal('new'),
    z.coerce.number().refine((n) => !Number.isNaN(n), {
      message: 'Invalid number',
    }),
  ]),
})
export const Route = createFileRoute(
  '/_protected/masters/party/_layout/patient/_layout/$id',
)({
  params: {
    parse: (params) => paramsSchema.parse(params),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  loader: ({ context, params: { id } }) => {
    if (id === 'new') return null
    return context.queryClient.ensureQueryData(patientQueryOptions(id))
  },
  component: () => {
    const { id } = Route.useParams()
    if (id === 'new') return <PatientDetails />

    const { data: patient } = useSuspenseQuery(patientQueryOptions(id))
    return (
      <Suspense fallback={<Loader className="animate-spin" />}>
        <PatientDetails data={patient?.data} />
      </Suspense>
    )
  },
  errorComponent: () => (
    <div>
      {' '}
      <span className="bg-red-400  ">By ID:</span> Error loading patient
      data[].{' '}
    </div>
  ),
  pendingComponent: () => <Loader className="animate-spin" />,
})
