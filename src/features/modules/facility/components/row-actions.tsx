import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import type { Row } from "@tanstack/react-table"

import type { FacilityInterface } from "../data/schema"
import { useFacility } from "../contexts/facility-contexts"

interface DataTableRowActionsProps {
    row: Row<FacilityInterface>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const { setOpen, currentRow, setCurrentRow } = useFacility()
    const { row } = props
    return (
        <DataTableRowActions<FacilityInterface>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                console.log("row Action: ", currentRow)
                // navigate({
                //     to: CompanyDetailRoute.to,
                //     params: { id: data.id! },
                // })

            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
        />
    )
}

export default RowActions