import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchBuildingByIdService, fetchBuildingService, storeBuildingService } from "./api";
import type { BuildingForm } from "./schema";




const BASE_KEY = 'buildings';


export const buildingQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () => id ? fetchBuildingByIdService(id) : fetchBuildingService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};




export function useBuildingMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BuildingForm & { id?: string }) => {
            if (data.id) {
                // update service is to be returned
                return null;
            }
            return await storeBuildingService(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Building mutation failed:", error)
        }
    })
}