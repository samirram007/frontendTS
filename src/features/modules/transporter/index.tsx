
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { transporterListSchema, type TransporterList } from './data/schema'


// Import the correct type for transporterListSchema



interface TransporterProps {
  data: TransporterList
}

export default function Transporter({ data }: TransporterProps) {


  return (
    <>

      <Main className='min-w-full'>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Transporter List</h2>
            <p className='text-muted-foreground'>
              Manage your Transporter  here.
            </p>
          </div>
          <PrimaryButtons isModal={false} type="text" />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={transporterListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </>
  )
}
