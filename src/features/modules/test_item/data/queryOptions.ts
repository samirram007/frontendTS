import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchTestItemByIdService, fetchTestItemService, storeTestItemService, updateTestItemService } from "./api"
import type { TestItemForm } from "./schema"

const BASE_KEY = "test_items"

export const testItemQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchTestItemByIdService(id) : fetchTestItemService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export function useTestItemMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: TestItemForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateTestItemService(data)
            }
            // Otherwise create
            return await storeTestItemService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Test Item mutation failed:", error)
        },
    })
}