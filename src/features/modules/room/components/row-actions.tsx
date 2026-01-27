import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"

import { Route as RoomDetailRoute } from '@/routes/_protected/masters/infrastructure/_layout/room/_layout/$id'

import { useRoom } from "../context/room-context"
import type { Room } from "../data/schema"

interface DataTableRowActionsProps {
    row: Row<Room>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const navigate = useNavigate()
    const { setOpen, setCurrentRow } = useRoom()
    const { row } = props
    return (
        <DataTableRowActions<Room>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                navigate({
                    to: RoomDetailRoute.to,
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