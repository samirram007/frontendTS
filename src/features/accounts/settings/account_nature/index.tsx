
import { Main } from '@/layouts/components/main'
import { columns } from './components/account_natures-columns'





import { AccountNaturesDialogs } from './components/account_natures-dialogs'
import { AccountNaturesPrimaryButtons } from './components/account_natures-primary-buttons'
import { AccountNaturesTable } from './components/account_natures-table'
import AccountNatureProvider from './contexts/account-nature-context'
import { accountNatureListSchema, type AccountNatureList } from './data/schema'


// Import the correct type for accountNatureListSchema



interface AccountNatureProps {
  data: AccountNatureList
}

export default function AccountNature({ data }: AccountNatureProps) {


  return (
    <AccountNatureProvider>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Account Nature List</h2>
            <p className='text-muted-foreground'>
              Manage your account nature  here.
            </p>
          </div>
          <AccountNaturesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <AccountNaturesTable
            data={accountNatureListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <AccountNaturesDialogs />
    </AccountNatureProvider>
  )
}
