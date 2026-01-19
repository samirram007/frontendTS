
import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'





import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import DeliveryRouteProvider from './contexts/delivery_route-context'
import { deliveryRouteListSchema, type DeliveryRouteList } from './data/schema'
import { AppBreadcrumbs } from '@/features/global/components/AppBreadcrumb'


// Import the correct type for deliveryRouteListSchema



interface DeliveryRouteProps {
    data: DeliveryRouteList
}

export default function DeliveryRoute({ data }: DeliveryRouteProps) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Delivery Places' },
    ]


    return (
        <DeliveryRouteProvider>

            <Main className='min-w-full'>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Delivery Route List</h2>
                        <p className='text-muted-foreground'>
                            Manage your delivery route  here.
                        </p>
                        <div className="mt-1">
                            <AppBreadcrumbs items={breadcrumbItems} />
                        </div>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={deliveryRouteListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <Dialogs />
        </DeliveryRouteProvider>
    )
}
