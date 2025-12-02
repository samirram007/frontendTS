import DayBook from '@/features/modules/voucher/day_book';
import { dayBookQueryOptions } from '@/features/modules/voucher/day_book/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

export const Route = createFileRoute(
  '/_protected/reports/day_book/_layout/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(dayBookQueryOptions()),
  component: () => {
    const { data: daybook } = useSuspenseQuery(dayBookQueryOptions())

    return <DayBook data={daybook?.data} />
  },
  errorComponent: () => <div>Error loading day Book data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})