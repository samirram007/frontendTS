
import { Main } from '@/layouts/components/main'





import { useInventory } from '@/features/masters/inventory/context/inventory-context'
import { useEffect } from 'react'


// Import the correct type for stockitemListSchema




export default function StockItemDetails() {
    const { setSideBarOpen } = useInventory()
    useEffect(() => {
        setSideBarOpen && setSideBarOpen(false)
    }, [])
    return (

        <>
            <Main className='min-w-full'>
                <h1>CONFIGURATION</h1>
                {/* <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ActionPages currentRow={data}
                        key={`${keyName}-add`} />
                </div> */}
            </Main>

            {/* <Pages /> */}
        </>
    )
}
