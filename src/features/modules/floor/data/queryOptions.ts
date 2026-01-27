import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchFloorByIdService, fetchFloorService, storeFloorService, udpateFloorService } from "./api";
import type { FloorForm } from "./schema";




const BASE_KEY = 'floors';


export const floorQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: [BASE_KEY, id],
        queryFn: () => id ? fetchFloorByIdService(id) : fetchFloorService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};




export function useFloorMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FloorForm & { id?: string }) => {
            if (data.id) {
                return await udpateFloorService(data);
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