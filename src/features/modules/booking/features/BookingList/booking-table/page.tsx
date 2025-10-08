import { useMemo } from "react";
import { useGetBookingQuery } from "../../NewBooking/data/queryOptions";
import { columns } from "./columns";
import { BookingListDataTable } from "./data-table";


export function BookingListTable(){

  const { data, isSuccess } = useGetBookingQuery();

  const bookingList = useMemo(()=>{
    return data?.data.data ?? []
  },[isSuccess,data]);
  

  return(
      <div className="mx-auto py-10">
          <BookingListDataTable columns={columns} data={bookingList}  />
      </div>
  )
}