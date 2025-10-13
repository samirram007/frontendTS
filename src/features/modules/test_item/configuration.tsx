
import { Main } from '@/layouts/components/main'





import { useInventory } from '@/features/masters/inventory/context/inventory-context'
import { useEffect } from 'react'
import { type TestItem } from './data/schema'
import ConfigurationPage from './components/configuration-page'


// Import the correct type for testitemListSchema



interface TestItemProps {
    data?: TestItem
}

export default function TestItemConfiguration(props: TestItemProps) {
    const { setSideBarOpen } = useInventory()
    const { data } = props
    const keyName = 'test_items'
    useEffect(() => {
        setSideBarOpen && setSideBarOpen(false)
    }, [])
    return (

        <>
            <Main className='min-w-full'>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ConfigurationPage currentRow={data}
                        key={`${keyName}-add`} />
                </div>
            </Main>

            {/* <Pages /> */}
        </>
    )
}
