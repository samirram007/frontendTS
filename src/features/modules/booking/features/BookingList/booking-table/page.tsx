import { useMemo } from "react";
import { columns } from "./columns";
import { BookingListDataTable } from "./data-table";
import { useGetAgentListQuery } from "../data/queryOptions";


export function BookingListTable(){

  const {data,isSuccess} = useGetAgentListQuery();

  const bookingList = useMemo(()=>{
    return data?.data.data ?? []
  },[isSuccess,data]);
  
  console.log(bookingList,"booking list");

  return(
      <div className="mx-auto py-10">
          <BookingListDataTable columns={columns} data={bookingList}  />
      </div>
  )
}