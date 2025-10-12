import { testItemQueryOptions } from '@/features/modules/test_item/data/queryOptions'
// import TestItemDetails from '@/features/accounts/settings/testitem/details'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import z from 'zod'

const TestItemDetails = React.lazy(() =>
    import('@/features/modules/test_item/details')
)
// build queryOptions for testitem
const paramsSchema = z.object({
    id: z.union([
        z.literal("new"),
        z.coerce.number().refine((n) => !Number.isNaN(n), {
            message: "Invalid number",
        }),
    ]),
})
export const Route = createFileRoute(
    '/_authenticated/masters/inventory/_layout/test_item/_layout/$id',
)({
    params: {
        parse: (params) => paramsSchema.parse(params),
        stringify: ({ id }) => ({ id: `${id}` }),
    },
    loader: ({ context, params: { id }, params }) => {
        console.log("🚀 Loader params:", id, params, typeof params)
        if (id === "new") return null
        return context.queryClient.ensureQueryData(testItemQueryOptions(id))
    },
    component: () => {
        const { id } = Route.useParams()

        if (id === "new") return <TestItemDetails />

        const { data: testItem } = useSuspenseQuery(testItemQueryOptions(id))
        return <Suspense fallback={<Loader className="animate-spin" />}>
            <TestItemDetails data={testItem?.data} />
        </Suspense>
    },
    errorComponent: () => <div> <span className='bg-red-400  '>By ID:</span> Error loading testItem data[]. </div>
    ,
    pendingComponent: () => <Loader className="animate-spin" />,
})
