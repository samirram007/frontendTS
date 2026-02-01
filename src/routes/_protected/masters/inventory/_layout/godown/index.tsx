import StorageUnit from '@/features/modules/storage_unit';
import { storageUnitQueryOptions } from '@/features/modules/storage_unit/data/queryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_protected/masters/inventory/_layout/godown/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(storageUnitQueryOptions()),
  component: () => {
    const { data: storagUnit } = useSuspenseQuery(storageUnitQueryOptions())

    return <StorageUnit data={storagUnit?.data} />
  },
  errorComponent: () => <div>Error loading godown data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

