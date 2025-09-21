
import { Main } from '@/layouts/components/main'





import { columns } from './components/columns'


import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import StockGroupProvider from './contexts/stock_group-context'
import { stockGroupListSchema, type StockGroupList } from './data/schema'



interface StockGroupProps {
    data: StockGroupList
}

export default function StockGroup({ data }: StockGroupProps) {


    return (
        <StockGroupProvider>

            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Stock Group List</h2>
                        <p className='text-muted-foreground'>
                            Manage your stock categories here.
                        </p>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable 
                        data={stockGroupListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <Dialogs />
        </StockGroupProvider>
    )
}
