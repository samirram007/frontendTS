import { useQuery } from "@tanstack/react-query";
import { getBookingListByDateService, getBookingListService } from "./api";

export function useGetBookingListQuery(startDate:string | null,endDate:string | null){
    return useQuery({
        queryKey: startDate && endDate ? ['get-all-bookings-query',startDate,endDate]  : ['get-all-bookings-query'],
        queryFn: () => startDate && endDate ? getBookingListByDateService(startDate,endDate) : getBookingListService(),
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: true
    })
}