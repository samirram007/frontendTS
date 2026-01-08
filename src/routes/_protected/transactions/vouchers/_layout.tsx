
import DistributorProvider from '@/features/modules/distributor/contexts/distributor-context'
import TransactionProvider from '@/features/transactions/context/transaction-context'
import TransactionLayout from '@/features/transactions/layouts/transaction-layout'
import { createFileRoute } from '@tanstack/react-router'
import { Dialogs as DistributorDialog } from '@/features/modules/distributor/components/dialogs'
export const Route = createFileRoute(
    '/_protected/transactions/vouchers/_layout',
)({
    component: () => {
        return (
            <DistributorProvider>
            <TransactionProvider>
                <TransactionLayout />
            </TransactionProvider>


                <DistributorDialog />
            </DistributorProvider>
        )
    }
})


