import Godown from '@/features/inventory/settings/godown';
import { godownQueryOptions } from '@/features/inventory/settings/godown/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_authenticated/masters/inventory/godown/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(godownQueryOptions()),
  component: () => {
    const { data: godown } = useSuspenseQuery(godownQueryOptions())
    console.log(godown, 'unique quantity code data');
    return <Godown data={godown?.data} />
  },
  errorComponent: () => <div>Error loading unique quantity code data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

