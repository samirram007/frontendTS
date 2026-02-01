import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchStorageUnitService, storeStorageUnitService, updateStorageUnitService } from "./api"
import type { StorageUnitForm } from "./schema"
//queryOptions.ts
const Key = "storageUnits"
export const storageUnitQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchStorageUnitService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useStorageUnitMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: StorageUnitForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateStorageUnitService(data)
            }
            // Otherwise create
            return await storeStorageUnitService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Storage Unit mutation failed:", error)
        },
    })
}