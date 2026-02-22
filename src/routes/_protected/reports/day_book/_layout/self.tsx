import { SkeletonTable } from '@/components/skeleton';
import DayBook from '@/features/modules/voucher/day_book';
import { dayBookSelfQueryOptions } from '@/features/modules/voucher/day_book/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute(
  '/_protected/reports/day_book/_layout/self',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(dayBookSelfQueryOptions()),
  component: () => {
    const { data: daybook } = useSuspenseQuery(dayBookSelfQueryOptions())
    console.log("DayBook Data: ", daybook)
    return <Suspense fallback={<SkeletonTable />}>
      <DayBook data={daybook?.data} />
    </Suspense>
  },
  errorComponent: () => <div>Error loading day Book data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})