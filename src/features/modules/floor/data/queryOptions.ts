import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchFloorService, storeFloorService } from "./api";
import type { FloorForm } from "./schema";




const BASE_KEY = 'floors';


export const floorQueryOptions = () => {
    return queryOptions({
        queryKey: [BASE_KEY],
        queryFn: () => fetchFloorService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};




export function useFloorMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FloorForm & { id?: string }) => {
            if (data.id) {
                // update service is to be returned
                return null;
            }
            return await storeFloorService(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Floor mutation failed:", error)
        }
    })
}