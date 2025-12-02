import TransactionProvider from '@/features/transactions/context/transaction-context'
import TransactionLayout from '@/features/transactions/layouts/transaction-layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/transactions/freight/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TransactionProvider>
      <TransactionLayout />
    </TransactionProvider>
  )
}

