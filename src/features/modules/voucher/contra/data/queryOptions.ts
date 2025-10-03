import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchContraByIdService, fetchContraService, storeContraService, updateContraService } from "./api"
import type { ContraForm } from "./schema"

const BASE_KEY = "vouchers"

export const contraQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchContraByIdService(id) : fetchContraService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export function useContraMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: ContraForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateContraService(data)
            }
            // Otherwise create
            return await storeContraService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Contra mutation failed:", error)
        },
    })
}