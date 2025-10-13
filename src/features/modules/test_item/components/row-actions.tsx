import { DataTableRowActions } from "@/features/global/components/data-table/data-table-row-actions"
import { useNavigate } from "@tanstack/react-router"
import type { Row } from "@tanstack/react-table"
import { useTestItem } from "../contexts/test_item-context"
import type { TestItem } from "../data/schema"

import { Route as TestItemDetailRoute } from '@/routes/_authenticated/masters/inventory/_layout/test_item/_layout/$id'
import { Route as TestItemConfigurationRoute} from '@/routes/_authenticated/masters/inventory/_layout/test_item/_layout/$id/configuration';

interface DataTableRowActionsProps {
    row: Row<TestItem>
}

const RowActions = (props: DataTableRowActionsProps) => {
    const navigate = useNavigate()
    const { setOpen, currentRow, setCurrentRow } = useTestItem()
    const { row } = props
    return (
        <DataTableRowActions<TestItem>
            row={row}
            onEdit={(data) => {
                setCurrentRow(data)
                console.log("row Action: ", currentRow)
                navigate({
                    to: TestItemDetailRoute.to,
                    params: { id: data.id! },
                })

            }}
            onDelete={(data) => {
                setCurrentRow(data)
                setOpen("delete")
            }}
            onConfiguraton={(data)=>{
                setCurrentRow(data);
                setOpen("configuration");
                navigate({
                    to: TestItemConfigurationRoute.to,
                    params: { id: data.id! },
                })
            }}
        />
    )
}

export default RowActions