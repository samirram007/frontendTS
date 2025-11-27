import { useQuery } from "@tanstack/react-query";
import { getAllBusinessReport } from "./api";



export function useGetBusinessReportListQuery() {
    return useQuery({
        queryKey: ['get-business-report-query'],
        queryFn: getAllBusinessReport,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}