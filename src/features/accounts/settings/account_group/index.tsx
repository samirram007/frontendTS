
import { Main } from '@/layouts/components/main'




import { columns } from './components/account_groups-columns'
import { AccountGroupsDialogs } from './components/account_groups-dialogs'
import { AccountGroupsPrimaryButtons } from './components/account_groups-primary-buttons'
import { AccountGroupsTable } from './components/account_groups-table'
import AccountGroupProvider from './contexts/account-group-context'
import { accountGroupListSchema, type AccountGroupList } from './data/schema'

interface AccountGroupListProps {
    data: AccountGroupList
}


export default function AccountGroup({ data }: AccountGroupListProps) {



    return (
        <AccountGroupProvider>

            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Account Group List</h2>
                        <p className='text-muted-foreground'>
                            Manage your account group  here.
                        </p>
                    </div>
                    <AccountGroupsPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <AccountGroupsTable
                        data={accountGroupListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <AccountGroupsDialogs />
        </AccountGroupProvider>
    )
}
