
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { useInventory } from '@/features/masters/inventory/context/inventory-context'
import { useEffect } from 'react'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { testItemListSchema, type TestItemList } from './data/schema'


// Import the correct type for testitemListSchema



interface TestItemProps {
  data: TestItemList
}

export default function TestItem({ data }: TestItemProps) {
  const { setSideBarOpen } = useInventory()


  useEffect(() => {
    setSideBarOpen && setSideBarOpen(true)
  }, [])

  return (
    <>

      <Main className='min-w-full'>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>TestItem List</h2>
            <p className='text-muted-foreground'>
              Manage your TestItem  here.
            </p>
          </div>
          <PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={testItemListSchema.parse(data ?? [])}
            columns={columns} />
        </div>
      </Main>

      <Dialogs />
    </>
  )
}
