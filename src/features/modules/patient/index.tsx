import { Main } from '@/layouts/components/main'
import { columns } from './components/columns'

import { useEffect } from 'react'
import { Dialogs } from './components/dialogs'
import { GridTable } from './components/grid-table'
import { PrimaryButtons } from './components/primary-buttons'
import { patientListSchema, type PatientList } from './data/schema'
import { useParty } from '@/features/masters/party/context/party-context'

// Import the correct type for patientListSchema

interface PatientProps {
  data: PatientList
}

export default function Patient({ data }: PatientProps) {
  console.log('here')

  const { setSideBarOpen } = useParty()

  useEffect(() => {
    setSideBarOpen && setSideBarOpen(true)
  }, [])

  return (
    <>
      <Main className="min-w-full">
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Patient List</h2>
            <p className="text-muted-foreground">Manage your Patient here.</p>
          </div>
          <PrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <GridTable
            data={patientListSchema.parse(data ?? [])}
            columns={columns}
          />
        </div>
      </Main>

      <Dialogs />
    </>
  )
}
