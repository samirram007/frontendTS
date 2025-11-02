import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import ReportingListDataTable from "./data-table";
import { jobOrderQueryOptions } from "../../../data/queryOptions";
import LoadingBar from "react-top-loading-bar";


export function ReportListTable(){

  const {data,isLoading,isError} = useQuery(jobOrderQueryOptions());

  if(isLoading) return <LoadingBar color="blue" />

  if(isError) return <LoadingBar color="red" />

  return(
      <div className="mx-auto py-10">
          <ReportingListDataTable columns={columns} data={data.data}  />
      </div>
  )
}