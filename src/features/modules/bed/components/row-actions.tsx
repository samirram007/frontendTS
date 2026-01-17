import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"

import { Route as CompanyDetailRoute } from '@/routes/_protected/masters/organization/_layout/company/_layout/$id'

import { useBed } from "../context/bed-context"
import type { Bed } from "../data/schema"

interface DataTableRowActionsProps {
    row: Row<Bed>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const navigate = useNavigate()
    const { setOpen, currentRow, setCurrentRow } = useBed()
    const { row } = props
    return (
        <DataTableRowActions<Bed>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                console.log("row Action: ", currentRow)
                // navigate({
                //     to: CompanyDetailRoute.to,
                //     params: { id: data.id! },
                // })

            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
        />
    )
}

export default RowActions