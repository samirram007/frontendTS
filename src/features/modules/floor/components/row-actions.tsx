import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"

import { Route as FloorDetailRoute } from '@/routes/_protected/masters/infrastructure/_layout/floor/_layout/$id'

import { useFloor } from "../context/floor-context"
import type { Floor } from "../data/schema"

interface DataTableRowActionsProps {
    row: Row<Floor>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const navigate = useNavigate()
    const { setOpen, currentRow, setCurrentRow } = useFloor()
    const { row } = props
    return (
        <DataTableRowActions<Floor>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                console.log("row Action: ", currentRow)
                navigate({
                    to: FloorDetailRoute.to,
                    params: { id: data.id! },
                })

            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
        />
    )
}

export default RowActions