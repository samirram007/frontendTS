
import { Main } from '@/layouts/components/main'





import { columns } from './components/stock_unit-columns'

import { StockUnitDialogs } from './components/stock_unit-dialogs'
import { StockUnitPrimaryButtons } from './components/stock_unit-primary-buttons'
import { StockUnitTable } from './components/stock_unit-table'
import StockUnitProvider from './contexts/stock_unit-context'
import { stockUnitListSchema, type StockUnitList } from './data/schema'



interface StockUnitProps {
    data: StockUnitList
}

export default function StockUnit({ data }: StockUnitProps) {
    console.log(data, 'stock unit props data');

    return (
        <StockUnitProvider>

            <Main className='min-w-full'>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Stock Unit List</h2>
                        <p className='text-muted-foreground'>
                            Manage your stock categories here.
                        </p>
                    </div>
                    <StockUnitPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <StockUnitTable
                        data={stockUnitListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <StockUnitDialogs />
        </StockUnitProvider>
    )
}
