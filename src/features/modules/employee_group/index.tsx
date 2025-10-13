
import { Main } from '@/layouts/components/main'





import { columns } from './components/columns'


import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'

import EmployeeGroupProvider from './contexts/employee_group-context'
import { employeeGroupListSchema, type EmployeeGroupList } from './data/schema'



interface EmployeeGroupProps {
    data: EmployeeGroupList
}

export default function EmployeeGroup({ data }: EmployeeGroupProps) {


    return (
        <EmployeeGroupProvider>

            <Main className='min-w-full'>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Employee Group List</h2>
                        <p className='text-muted-foreground'>
                            Manage your employee categories here.
                        </p>
                    </div>
                    <PrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={employeeGroupListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <Dialogs />
        </EmployeeGroupProvider>
    )
}
