import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import { useStorageUnit } from "../contexts/storage-unit-context"
import type { StorageUnit } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<StorageUnit>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useStorageUnit()
    const { row } = props
    return (
        <DataTableRowActions<StorageUnit>
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