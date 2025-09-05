import AccountGroup from '@/features/accounts/settings/account_group'
import { accountGroupQueryOptions } from '@/features/accounts/settings/account_group/data/queryOptions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'



export const Route = createFileRoute(
  '/_authenticated/masters/accounts/account_group/',
)({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(accountGroupQueryOptions()),
  component: () => {
    const { data: accountGroup } = useSuspenseQuery(accountGroupQueryOptions())
    return <AccountGroup data={accountGroup?.data} />
  },
  errorComponent: () => <div>Error loading account group data.</div>,
  pendingComponent: () => <Loader className="animate-spin" />,
})
