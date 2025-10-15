
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { lowerCase } from '../../../utils/removeEmptyStrings'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import RoleProvider from './contexts/role-context'
import { roleListSchema, type RoleList } from './data/schema'


// Import the correct type for roleListSchema



interface RoleProps {
  data: RoleList
}

export default function Role({ data }: RoleProps) {
  const moduleName = "Role"

  return (
    <RoleProvider>

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
            data={roleListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </RoleProvider>
  )
}
