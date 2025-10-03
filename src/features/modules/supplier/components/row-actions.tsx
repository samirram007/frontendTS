import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import { useSupplier } from "../contexts/supplier-context"
import type { Supplier } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<Supplier>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useSupplier()
    const { row } = props
    return (
        <DataTableRowActions<Supplier>
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