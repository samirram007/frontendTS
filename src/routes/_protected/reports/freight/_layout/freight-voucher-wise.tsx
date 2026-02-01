import { freightReportQueryOptions } from '@/features/modules/voucher/freight/data/queryOptions'
import FreightVoucherWise from '@/features/modules/voucher/freight/voucher-wise'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'

export const Route = createFileRoute(
    '/_protected/reports/freight/_layout/freight-voucher-wise',
)({
    loader: ({ context }) =>
        context.queryClient.ensureQueryData(freightReportQueryOptions('voucher_wise')),
    component: () => {
        const { data: freightVoucherWise } = useSuspenseQuery(freightReportQueryOptions('voucher_wise'))
        return <FreightVoucherWise data={freightVoucherWise?.data} />
    },
    errorComponent: () => <div>Error loading freight voucher wise data.</div>,
    pendingComponent: () => <Loader className="animate-spin" />,
})