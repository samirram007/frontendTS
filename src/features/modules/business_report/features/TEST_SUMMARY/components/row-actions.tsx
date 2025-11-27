import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"
import type { ITestSummaryReport } from "../data/schema"


interface DataTableRowActionsProps {
    row: Row<ITestSummaryReport>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { row } = props
    return (
        <DataTableRowActions<ITestSummaryReport>
            row={row}
            onEdit={(_data) => {
            }}
            onDelete={(_data) => {
            }}
        />
    )
}

export default RowActions