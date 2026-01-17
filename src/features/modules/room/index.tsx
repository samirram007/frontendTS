import { Main } from "@/layouts/components/main";
import { GridTable } from "./components/grid-table";
import { columns } from "./components/columns";
import { PrimaryButtons } from "./components/primary-buttons";
import type { RoomList } from "./data/schema";





interface RoomProps {
    data: RoomList
}




export default function Room({ data }: RoomProps) {
    return (
        <>
            <Main className='min-w-full'>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Room List</h2>
                        <p className='text-muted-foreground'>
                            Manage your Rooms  here.
                        </p>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        // data={roomSchemaList.parse(data ?? [])}
                        data={data}
                        columns={columns} />
                </div>
            </Main>
        </>
    )
}