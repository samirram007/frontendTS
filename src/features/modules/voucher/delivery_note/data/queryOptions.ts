import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchDeliveryNoteByIdService, fetchDeliveryNoteService, storeDeliveryNoteService, updateDeliveryNoteService } from "./api"
import type { DeliveryNoteForm } from "./schema"

const BASE_KEY = "deliveryNote"

export const deliveryNoteQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchDeliveryNoteByIdService(id) : fetchDeliveryNoteService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export function useDeliveryNoteMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: DeliveryNoteForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateDeliveryNoteService(data)
            }
            // Otherwise create
            return await storeDeliveryNoteService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("DeliveryNote mutation failed:", error)
        },
    })
}