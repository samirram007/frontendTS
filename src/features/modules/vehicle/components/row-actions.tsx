import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import { useVehicle } from "../contexts/vehicle-context"
import type { Vehicle } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<Vehicle>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useVehicle()
    const { row } = props
    return (
        <DataTableRowActions<Vehicle>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                setOpen("edit")
            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
        />
    )
}

export default RowActions