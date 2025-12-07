import { useQuery } from "@tanstack/react-query";
import { getDailyCollectionReport } from "./api";




export const useGetTestSummaryReport = () => {
    return useQuery({
        queryKey: ['daily-collection-report'],
        queryFn: () => getDailyCollectionReport(),
        retry: false,
        enabled: true
    });
}