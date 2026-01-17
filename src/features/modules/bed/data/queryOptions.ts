import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchBedService, storeBedService } from "./api";
import type { BedForm } from "./schema";




const BASE_KEY = 'beds';


export const bedQueryOptions = () => {
    return queryOptions({
        queryKey: [BASE_KEY],
        queryFn: () => fetchBedService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};




export function useBedMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BedForm & { id?: string }) => {
            if (data.id) {
                // update service is to be returned
                return null;
            }
            return await storeBedService(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Bed mutation failed:", error)
        }
    })
}