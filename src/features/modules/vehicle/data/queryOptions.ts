import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchVehicleService, storeVehicleService, updateVehicleService, } from "./api"
import type { VehicleForm } from "./schema"
//queryOptions.ts
const Key = "vehicles"
export const vehicleQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchVehicleService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useVehicleMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: VehicleForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateVehicleService(data)
            }
            // Otherwise create
            return await storeVehicleService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Vehicle mutation failed:", error)
        },
    })
}