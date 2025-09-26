
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { countryListSchema, type CountryList } from './data/schema'


// Import the correct type for countryListSchema



interface CountryProps {
  data: CountryList
}

export default function Country({ data }: CountryProps) {


  return (
    <>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Country List</h2>
            <p className='text-muted-foreground'>
              Manage your Country  here.
            </p>
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={countryListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </>
  )
}
