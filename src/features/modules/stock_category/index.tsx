
import { Main } from '@/layouts/components/main'





import { columns } from './components/stock_category-columns'

import { StockCategoryDialogs } from './components/stock_category-dialogs'
import { StockCategoryPrimaryButtons } from './components/stock_category-primary-buttons'
import { StockCategoryTable } from './components/stock_category-table'
import StockCategoryProvider from './contexts/stock_category-context'
import { stockCategoryListSchema, type StockCategoryList } from './data/schema'



interface StockCategoryProps {
    data: StockCategoryList
}

export default function StockCategory({ data }: StockCategoryProps) {


    return (
        <StockCategoryProvider>

            <Main className='min-w-full'>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Stock Category List</h2>
                        <p className='text-muted-foreground'>
                            Manage your stock categories here.
                        </p>
                    </div>
                    <StockCategoryPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <StockCategoryTable
                        data={stockCategoryListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <StockCategoryDialogs />
        </StockCategoryProvider>
    )
}
