import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchDeliveryVehicleService, storeDeliveryVehicleService, updateDeliveryVehicleService, } from "./api"
import type { DeliveryVehicleForm } from "./schema"
//queryOptions.ts
const Key = "delivery_vehicles"
export const deliveryVehicleQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchDeliveryVehicleService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useDeliveryVehicleMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: DeliveryVehicleForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateDeliveryVehicleService(data)
            }
            // Otherwise create
            return await storeDeliveryVehicleService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Vehicle mutation failed:", error)
        },
    })
}