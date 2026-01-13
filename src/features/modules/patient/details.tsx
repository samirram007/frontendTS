import { Main } from '@/layouts/components/main'

import { usePayroll } from '@/features/masters/payroll/context/payroll-context'
import { useEffect } from 'react'
import { ActionPages } from './components/action-page'
import { type Patient } from './data/schema'

// Import the correct type for patientListSchema

interface PatientProps {
  data?: Patient
}

export default function PatientDetails(props: PatientProps) {
  const keyName = 'patient'

  const { setSideBarOpen } = usePayroll()
  const { data } = props
  useEffect(() => {
    setSideBarOpen && setSideBarOpen(false)
  }, [])

  return (
    <>
      <Main className="min-w-full">
        <div className=" flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <ActionPages currentRow={data} key={`${keyName}-add`} />
        </div>
      </Main>

      {/* <Pages /> */}
    </>
  )
}
