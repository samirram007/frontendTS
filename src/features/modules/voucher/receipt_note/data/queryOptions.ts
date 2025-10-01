import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchReceiptNoteByIdService, fetchReceiptNoteService, storeReceiptNoteService, updateReceiptNoteService } from "./api"
import type { ReceiptNoteForm } from "./schema"

const BASE_KEY = "receiptNote"

export const receiptNoteQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchReceiptNoteByIdService(id) : fetchReceiptNoteService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export function useReceiptNoteMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: ReceiptNoteForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateReceiptNoteService(data)
            }
            // Otherwise create
            return await storeReceiptNoteService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("ReceiptNote mutation failed:", error)
        },
    })
}