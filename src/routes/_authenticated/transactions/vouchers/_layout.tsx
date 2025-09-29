import TransactionLayout from '@/features/transactions/layouts/transaction-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
    '/_authenticated/transactions/vouchers/_layout',
)({
    component: TransactionLayout,
})


