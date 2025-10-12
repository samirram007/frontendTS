import { useQuery } from "@tanstack/react-query";
import { getBookingListService } from "./api";

export function useGetAgentListQuery(){
    return useQuery({
        queryKey:['get-all-bookings-query'],
        queryFn: getBookingListService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}