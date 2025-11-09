import { useMemo } from "react";
import { columns } from "./columns";
import { BookingListDataTable } from "./data-table";
import type { IAllBooking } from "../data/schema";



export function BookingListTable({ data, isSuccess, isFetching }: { data: IAllBooking[], isSuccess: boolean, isFetching: boolean }) {


  const bookingList = useMemo(() => {
    return data ?? []
  }, [isSuccess, data]);


  return (
    <div className="mx-auto py-10">
      <BookingListDataTable columns={columns} data={bookingList} loading={isFetching} />
    </div>
  )
}