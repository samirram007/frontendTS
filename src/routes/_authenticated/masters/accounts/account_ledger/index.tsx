
import AccountLedger from '@/features/accounts/settings/account_ledger'
import { accountLedgerQueryOptions } from '@/features/accounts/settings/account_ledger/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'


export const Route = createFileRoute(
  '/_authenticated/masters/accounts/account_ledger/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(accountLedgerQueryOptions()),
  component: () => {
    const { data: accountLedger } = useSuspenseQuery(accountLedgerQueryOptions())
    return <AccountLedger data={accountLedger?.data} />
  },
  errorComponent: () => <div>Error loading account ledger data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})

