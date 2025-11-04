
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { useAdministration } from '@/features/masters/administration/context/administration-context'
import { useEffect } from 'react'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { roleListSchema, type RoleList } from './data/schema'


// Import the correct type for roleListSchema



interface RoleProps {
  data: RoleList
}

export default function Role({ data }: RoleProps) {

  const { setSideBarOpen, setHeaderVisible } = useAdministration()

  useEffect(() => {
    setSideBarOpen?.(true)
    setHeaderVisible?.(true)
  }, [setSideBarOpen, setHeaderVisible])
  return (
    <>

      <Main className='min-w-full'>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Role & Permission</h2>
            <p className='text-muted-foreground'>
              Manage your role & permission here.
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
    </>
  )
}
