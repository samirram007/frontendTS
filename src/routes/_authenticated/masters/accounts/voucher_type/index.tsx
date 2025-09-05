import VoucherType from '@/features/accounts/settings/voucher_type'
import { voucherTypeQueryOptions } from '@/features/accounts/settings/voucher_type/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
  '/_authenticated/masters/accounts/voucher_type/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(voucherTypeQueryOptions()),
  component: () => {
    const { data: voucherType } = useSuspenseQuery(voucherTypeQueryOptions())
    return <VoucherType data={voucherType?.data} />
  },
  errorComponent: () => <div>Error loading voucher type data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})