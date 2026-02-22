import { Main } from "@/layouts/components/main"
import type { DistributorBookList } from "./data/schema"
import { GridTable } from "./components/grid-table"

import { columns } from "./components/columns"
import DistributorBookProvider from "./contexts/distributor_book-context"


type DistributorBookIndexProps = {
    data: DistributorBookList
}
const DistributorBookIndex = ({ data }: DistributorBookIndexProps) => {

    return (
        <DistributorBookProvider>
            <Main className='min-w-full'>
                <div className='mb-2 hidden flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Distributor Book</h2>
                        <p className='text-muted-foreground'>
                            Manage your distributor book.
                        </p>
                    </div>
                    {/* <PrimaryButtons /> */}
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={data}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </Main>
        </DistributorBookProvider>
    )
}

export default DistributorBookIndex