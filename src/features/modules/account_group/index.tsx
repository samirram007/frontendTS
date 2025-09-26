
import { Main } from '@/layouts/components/main'




import { columns } from './components/account_group-columns'
import { AccountGroupDialogs } from './components/account_group-dialogs'
import { AccountGroupPrimaryButtons } from './components/account_group-primary-buttons'
import { AccountGroupTable } from './components/account_group-table'
import { accountGroupListSchema, type AccountGroupList } from './data/schema'

interface AccountGroupListProps {
    data: AccountGroupList
}


export default function AccountGroup({ data }: AccountGroupListProps) {



    return (
        <>

            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Account Group List</h2>
                        <p className='text-muted-foreground'>
                            Manage your account group  here.
                        </p>
                    </div>
                    <AccountGroupPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <AccountGroupTable
                        data={accountGroupListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <AccountGroupDialogs />
        </>
    )
}
