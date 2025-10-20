
import { Main } from '@/layouts/components/main'




import { AccountLedgersPrimaryButtons } from './components/account_ledgers-primary-buttons'

import { columns } from './components/account_ledgers-columns'
import { AccountLedgersDialogs } from './components/account_ledgers-dialogs'
import { AccountLedgersTable } from './components/account_ledgers-table'
import { accountLedgerListSchema, type AccountLedgerList } from './data/schema'



interface AccountLedgerProps {
    data: AccountLedgerList
}

export default function AccountLedger({ data }: AccountLedgerProps) {


    return (
        <>

            <Main className='min-w-full'>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Account Ledger List</h2>
                        <p className='text-muted-foreground'>
                            Manage your account ledger here.
                        </p>
                    </div>
                    <AccountLedgersPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <AccountLedgersTable
                        data={accountLedgerListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <AccountLedgersDialogs />
        </>
    )
}
