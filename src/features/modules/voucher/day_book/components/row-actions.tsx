import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"
import { useDayBook } from "../contexts/day_book-context"
import type { DayBookSchema } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<DayBookSchema>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useDayBook()
    const navigate = useNavigate()
    const { row } = props
    return (
        <DataTableRowActions<DayBookSchema>
            row={row}
            onEdit={(data) => {
                // setCurrentRow(data) 
                const voucherType = data?.voucherType?.name.toLowerCase().replaceAll(" ", "_")
                navigate({
                    to: `/transactions/vouchers/${voucherType}/${data.id}`,
                });
            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
        />
    )
}

export default RowActions