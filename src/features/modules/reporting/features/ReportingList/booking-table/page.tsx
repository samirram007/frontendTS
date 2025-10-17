import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { BookingListDataTable } from "./data-table";
import { jobOrderQueryOptions } from "../../../data/queryOptions";
import LoadingBar from "react-top-loading-bar";


export function ReportListTable(){

  const {data,isLoading,isError} = useQuery(jobOrderQueryOptions());
  console.log("list data",data);

  if(isLoading) return <LoadingBar color="blue" />

  if(isError) return <LoadingBar color="red" />

  return(
      <div className="mx-auto py-10">
          <BookingListDataTable columns={columns} data={data}  />
      </div>
  )
}