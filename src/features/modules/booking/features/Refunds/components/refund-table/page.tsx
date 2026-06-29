import { useMemo } from "react";
import { RefundListDataTable } from "./data-table";
import { columns } from "./columns";



export function RefundListTable({ data, isSuccess, isFetching }: { data: [], isSuccess: boolean, isFetching: boolean }) {


    const bookingList = useMemo(() => {
        return data ?? []
    }, [isSuccess, data]);

    console.log("Refund list", bookingList);


    return (
        <div className="mx-auto py-4">
            <RefundListDataTable columns={columns} data={bookingList} loading={isFetching} />
        </div>
    )
}