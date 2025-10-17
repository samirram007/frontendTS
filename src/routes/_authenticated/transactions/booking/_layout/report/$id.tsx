import { jobOrderQueryOptions } from '@/features/modules/reporting/data/queryOptions';
import Reporting from '@/features/modules/reporting/Reporting';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import z from 'zod'


const TestReportingDetail = React.lazy(() =>
    import('@/features/modules/reporting/pages/ReportingDetail')
)

const paramsSchema = z.object({
    id: z.union([
        z.literal(""),
        z.coerce.number().refine((n) => !Number.isNaN(n), {
            message: "Invalid number",
        }),
    ]),
})


export const Route = createFileRoute(
  '/_authenticated/transactions/booking/_layout/report/$id',
)({
    params:{
        parse: (params) => paramsSchema.parse(params),
        stringify: ({id}) => ({id: `${id}`}),
    },
    loader: ({ context, params: { id } }) => {
        if (id === "") return null
        return context.queryClient.ensureQueryData(jobOrderQueryOptions(id))
    },
    component: () => {
    const { id } = Route.useParams()

    if (id === "") return <Reporting />

    const { data: jobOrder } = useSuspenseQuery(jobOrderQueryOptions(Number(id)));
    console.log("api call job order: ",jobOrder.data);
    return <Suspense fallback={<Loader className="animate-spin" />}>
        <TestReportingDetail data={jobOrder?.data}  />
    </Suspense>
  },
});