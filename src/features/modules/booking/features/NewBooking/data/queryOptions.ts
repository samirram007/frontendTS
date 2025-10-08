import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { fetchByIdBookingService, getAllBookingService, storeBookingService } from "./api";
import type { IBookingTest } from "./schema";
import { showErrors } from "@/utils/dataClient";

const BASE_KEY = "get-booking-query-by-id";



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




export function useGetBookingQuery(){
    return useQuery({
        queryKey:['get-booking-query'],
        queryFn: getAllBookingService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}

export const bookingQueryOptions = (id:number) => {

    return queryOptions({
        queryKey: [BASE_KEY],
        queryFn: () => fetchByIdBookingService(id),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}