import StockSummary from '@/features/modules/voucher/stock_summary'
import StockSummaryProvider from '@/features/modules/voucher/stock_summary/contexts/stock_summary-context'

import ReportProvider from '@/features/reports/context/report-context'
import ReportLayout from '@/features/reports/layouts/report-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_protected/reports/stock_summary/_layout',
)({
    component: () => {
        return (
            <ReportProvider>
                <ReportLayout />
            </ReportProvider>
        )
    }
})


