
import { Main } from '@/layouts/components/main'





import { columns } from './components/columns'


import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import DayBookProvider from './contexts/day_book-context'
import { dayBookListSchema, type DayBookList } from './data/schema'



interface DayBookProps {
    data: DayBookList
}

export default function DayBook({ data }: DayBookProps) {


    return (
        <DayBookProvider>

            <Main className='min-w-full'>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Day Book</h2>
                        <p className='text-muted-foreground'>
                            Manage your day book.
                        </p>
                    </div>
                    {/* <PrimaryButtons /> */}
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={dayBookListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <Dialogs />
        </DayBookProvider>
    )
}
