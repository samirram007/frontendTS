import { DataTableRowActions } from '@/features/global/components/data-table/data-table-row-actions'
import { useNavigate } from '@tanstack/react-router'
import type { Row } from '@tanstack/react-table'
import type { Patient } from '../data/schema'

import { Route as PatientDetailRoute } from '@/routes/_protected/masters/payroll/_layout/patient/_layout/$id'
import { usePatient } from '../contexts/patient-contexts'

interface DataTableRowActionsProps {
  row: Row<Patient>
}

const RowActions = (props: DataTableRowActionsProps) => {
  const navigate = useNavigate()
  const { setOpen, currentRow, setCurrentRow } = usePatient()
  const { row } = props
  return (
    <DataTableRowActions<Patient>
      row={row}
      onEdit={(data) => {
        setCurrentRow(data)
        console.log('row Action: ', currentRow)
        navigate({
          to: PatientDetailRoute.to,
          params: { id: data.id! },
        })
      }}
      onDelete={(data) => {
        setCurrentRow(data)
        setOpen('delete')
      }}
    />
  )
}

export default RowActions
