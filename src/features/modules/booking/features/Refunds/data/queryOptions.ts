import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCancelledBookingListService, getCancelledBookingListServiceById } from "./api";

const BASE_KEY = "cancelled-booking";


export function useGetCancelledBookingListQuery() {
    return useQuery({
        queryKey: ['cancelled-bookings'],
        queryFn: () => getCancelledBookingListService(),
        retry: false,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled: true
    })
}




export const bookingRefundOptions = (bookingNo: string) => {
    return queryOptions({
        queryKey: [BASE_KEY, bookingNo],
        queryFn: () => getCancelledBookingListServiceById(bookingNo),
        retry: 0
    });
} 