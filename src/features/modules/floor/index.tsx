import { Main } from "@/layouts/components/main";
import { GridTable } from "./components/grid-table";
import { columns } from "./components/columns";
import { PrimaryButtons } from "./components/primary-buttons";
import type { FloorList } from "./data/schema";





interface FloorProps {
    data: FloorList
}




export default function Floor({ data }: FloorProps) {
    return (
        <>
            <Main className='min-w-full'>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Floor List</h2>
                        <p className='text-muted-foreground'>
                            Manage your Floors  here.
                        </p>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        // data={floorSchemaList.parse(data ?? [])}
                        data={data}
                        columns={columns} />
                </div>
            </Main>
        </>
    )
}