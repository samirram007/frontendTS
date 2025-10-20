import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import { useDayBook } from "../contexts/day_book-context"
import type { DayBook } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<DayBook>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useDayBook()
    const { row } = props
    return (
        <DataTableRowActions<DayBook>
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