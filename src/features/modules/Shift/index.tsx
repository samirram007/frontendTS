
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { lowerCase } from '../../../utils/removeEmptyStrings'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import ShiftProvider from './contexts/shift-context'
import { shiftListSchema, type ShiftList } from './data/schema'


// Import the correct type for shiftListSchema



interface ShiftProps {
  data: ShiftList
}

export default function Shift({ data }: ShiftProps) {
  const moduleName = "Shift"

  return (
    <ShiftProvider>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{moduleName} List</h2>
            <p className='text-muted-foreground'>
              Manage your {lowerCase(moduleName)}  here.
            </p>
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={shiftListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </ShiftProvider>
  )
}
