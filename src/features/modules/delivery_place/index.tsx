
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import DeliveryPlaceProvider from './contexts/delivery_place-context'
import { deliveryPlaceListSchema, type DeliveryPlaceList } from './data/schema'


// Import the correct type for deliveryPlaceListSchema



interface DeliveryPlaceProps {
    data: DeliveryPlaceList
}

export default function DeliveryPlace({ data }: DeliveryPlaceProps) {


    return (
        <DeliveryPlaceProvider>

            <Main className='min-w-full'>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Delivery Place List</h2>
                        <p className='text-muted-foreground'>
                            Manage your delivery place  here.
                        </p>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={deliveryPlaceListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <Dialogs />
        </DeliveryPlaceProvider>
    )
}
