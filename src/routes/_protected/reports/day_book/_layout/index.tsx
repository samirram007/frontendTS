import DayBook from '@/features/modules/voucher/day_book';
import { dayBookQueryOptions } from '@/features/modules/voucher/day_book/data/queryOptions';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

export const Route = createFileRoute(
  '/_protected/reports/day_book/_layout/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(dayBookQueryOptions()),
  component: () => {
    const { data: daybook } = useSuspenseQuery(dayBookQueryOptions())
    //console.log("DayBook Data: ", daybook)
    return <Suspense fallback={<Loader className="animate-spin" />}>
      <DayBook data={daybook?.data} />
    </Suspense>
  },
  errorComponent: () => <div>Error loading day Book data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})