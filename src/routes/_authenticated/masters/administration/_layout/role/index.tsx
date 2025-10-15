import Role from '@/features/modules/role';
import { roleQueryOptions } from '@/features/modules/role/data/queryOptions';


import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_authenticated/masters/administration/_layout/role/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(roleQueryOptions()),
  component: () => {
    const { data: role } = useSuspenseQuery(roleQueryOptions())

    return <Role data={role?.data} />
  },
  errorComponent: () => <div>Error loading roles.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

