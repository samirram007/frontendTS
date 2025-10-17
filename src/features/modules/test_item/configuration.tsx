
import { Main } from '@/layouts/components/main'

import { useInventory } from '@/features/masters/inventory/context/inventory-context'
import { useEffect } from 'react'
import { testItemReportTemplateResponseSchemas, type TestItem, type TestItemReportTemplateResponseSchema } from './data/schema'
import ConfigurationPage from './components/configuration-page'
import { Configurationcolumns } from './components/configuration-columns'
import { ConfigurationGridTable } from './components/configuration-grid-table'


// Import the correct type for testitemListSchema



interface TestItemProps {
    data?: TestItem,
    reportData?: TestItemReportTemplateResponseSchema[]
}

export default function TestItemConfiguration(props: TestItemProps) {
    const { data,reportData } = props

    console.log(reportData,"Report Data");
    const { setSideBarOpen } = useInventory()
    
    const keyName = 'test_items'
    useEffect(() => {
        setSideBarOpen && setSideBarOpen(false)
    }, []);

   const parsedTemplates = Array.isArray(reportData)
    ? testItemReportTemplateResponseSchemas.parse(reportData)
    : []
    
    console.log(parsedTemplates,"parsed")
    return (

        <>
            <Main className='min-w-full'>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ConfigurationPage currentRow={data}
                        key={`${keyName}-add`} />
                </div>
                <div>
                      <ConfigurationGridTable
                                data={parsedTemplates}
                                columns={Configurationcolumns} />
                </div>
            </Main>

            {/* <Pages /> */}
        </>
    )
}
