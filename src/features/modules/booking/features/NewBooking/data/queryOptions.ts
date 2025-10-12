import { queryOptions, useMutation } from "@tanstack/react-query";
import { fetchByIdBookingService, storeBookingService } from "./api";
import type { IBookingTest } from "./schema";
import { showErrors } from "@/utils/dataClient";

const BASE_KEY = "get-booking-query-by-id";


// Test Booking Service
export function useBookingMutation() {

    return useMutation({
        mutationFn: async (data: IBookingTest) => {
            // if (data.id != 0 && data.id != undefined) {
            //     // Update if id exists
            //     return await updateAgentService(data)
            // }
            // Otherwise create
            return await storeBookingService(data)
        },
        onError: (error) => {
            showErrors(error);
            
        },
    })
}


export const bookingQueryOptions = (id:number) => {

    return queryOptions({
        queryKey: [BASE_KEY,id],
        queryFn: () => fetchByIdBookingService(id),
        retry: 0,
    })
}