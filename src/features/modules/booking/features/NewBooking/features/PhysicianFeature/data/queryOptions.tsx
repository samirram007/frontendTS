import { useMutation, useQuery } from "@tanstack/react-query"
import { getPhysicianService, storePhysicianService } from "./api"
import type { IPhysician } from "./schema"








export function usePhysicianMutation() {
    return useMutation({
        mutationFn: async (data: IPhysician) => {
            // if (data.id) {
            //     // Update if id exists
            //     return await updateStockItemService(data)
            // }
            // Otherwise create
            return await storePhysicianService(data)
        },
        onSuccess: () => {
        },
        onError: (error) => {
            console.error("Stock Physician mutation failed:", error)
        },
    })
}



export function useGetPhysicianListQuery(){
    return useQuery({
        queryKey:['get-physician-query'],
        queryFn: getPhysicianService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}