import { buildingQueryOptions } from '@/features/modules/building/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react'
import z from 'zod'


const BuildingDetails = React.lazy(() =>
  import('@/features/modules/building/details')
);

const paramsSchema = z.object({
  id: z.union([
    z.literal("new"),
    z.string({ message: "Invalid id" }),
  ]),
});


export const Route = createFileRoute(
  '/_protected/masters/infrastructure/_layout/building/_layout/$id',
)({
  params: {
    parse: (params) => paramsSchema.parse(params),
    stringify: ({ id }) => ({ id: `${id}` }),
  },
  loader: ({ context, params: { id } }) => {
    if (id == "new") return null;
    return context.queryClient.ensureQueryData(buildingQueryOptions(id));
  },
  component: () => {
    const { id } = Route.useParams();
    if (id === "new") return <BuildingDetails />;

    const { data: building } = useSuspenseQuery(buildingQueryOptions(id));
    return <Suspense fallback={<Loader className='animate-spin' />}>
      <BuildingDetails data={building.data} />
    </Suspense>
  },
  errorComponent: () => <div> <span className='bg-red-400  '>By ID:</span> Error loading building data[]. </div>
  ,
  pendingComponent: () => <Loader className="animate-spin" />,
})