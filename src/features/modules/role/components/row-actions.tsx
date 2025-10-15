import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import { useRole } from "../contexts/role-context"
import type { Role } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<Role>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useRole()
    const { row } = props
    return (
        <DataTableRowActions<Role>
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