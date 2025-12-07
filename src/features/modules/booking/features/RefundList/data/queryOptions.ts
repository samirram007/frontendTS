import { useQuery } from "@tanstack/react-query";
import { getCancelledBookingListService } from "./api";



export function useGetCancelledBookingListQuery() {
    return useQuery({
        queryKey: ['get-cancelled-bookings-list-query'],
        queryFn: () => getCancelledBookingListService(),
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: true
    })
}