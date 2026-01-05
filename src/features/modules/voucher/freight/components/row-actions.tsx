import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"
import type { StockSummarySchema } from "../../stock_summary/data/schema"
import { useStockSummary } from "../../stock_summary/contexts/stock_summary-context"



interface DataTableRowActionsProps {
    row: Row<StockSummarySchema>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, setCurrentRow } = useStockSummary()
    const navigate = useNavigate()
    const { row } = props
    return (
        <DataTableRowActions<StockSummarySchema>
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