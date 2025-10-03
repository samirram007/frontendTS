import { useQuery } from "@tanstack/react-query";
import { getLabTestItemService } from "./api";












export function useGetAgentListQuery(){
    return useQuery({
        queryKey:['get-lab-items-query'],
        queryFn: getLabTestItemService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}