
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { currencyListSchema, type CurrencyList } from './data/schema'


// Import the correct type for currencyListSchema



interface CurrencyProps {
  data: CurrencyList
}

export default function Currency({ data }: CurrencyProps) {


  return (
    <>

      <Main className='min-w-full'>

        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Currency List</h2>
            <p className='text-muted-foreground'>
              Manage your Currency  here.
            </p>
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={currencyListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </>
  )
}
