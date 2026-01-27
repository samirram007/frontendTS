import { roomQueryOptions } from '@/features/modules/room/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react'
import z from 'zod'



const RoomDetails = React.lazy(() => import('@/features/modules/room/details'));

const paramsSchema = z.object({
    id: z.union([
        z.literal("new"),
        z.string({ message: "Invalid id" }),
    ]),
});


export const Route = createFileRoute(
    '/_protected/masters/infrastructure/_layout/room/_layout/$id',
)({
    params: {
        parse: (params) => paramsSchema.parse(params),
        stringify: ({ id }) => ({ id: `${id}` }),
    },
    loader: ({ context, params: { id } }) => {
        if (id == "new") return null;
        return context.queryClient.ensureQueryData(roomQueryOptions(id));
    },
    component: () => {
        const { id } = Route.useParams();
        if (id === "new") return <RoomDetails />;

        const { data: room } = useSuspenseQuery(roomQueryOptions(id));
        return <Suspense fallback={<Loader className='animate-spin' />}>
            <RoomDetails data={room.data} />
        </Suspense>
    },
    errorComponent: () => <div> <span className='bg-red-400  '>By ID:</span> Error loading building data[]. </div>
    ,
    pendingComponent: () => <Loader className="animate-spin" />,
})