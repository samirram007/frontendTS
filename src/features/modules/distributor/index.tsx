
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { lowerCase } from '../../../utils/removeEmptyStrings'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import GodownProvider from './contexts/godown-context'
import { godownListSchema, type GodownList } from './data/schema'


// Import the correct type for godownListSchema



interface GodownProps {
  data: GodownList
}

export default function Godown({ data }: GodownProps) {
  const moduleName = "Godown"

  return (
    <GodownProvider>

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
            data={godownListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </GodownProvider>
  )
}
