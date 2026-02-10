import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import type { DayBookForm } from "../types/types"
import { fetchDayBookService, storeDayBookService, updateDayBookService } from "./api"
const Key = "DayBooks"
export const dayBookQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchDayBookService,
        staleTime: 1000 * 30, // 30 seconds
        retry: 1,
    })
}
export function useDayBookMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: DayBookForm & { id?: number }) => {
            // console.log("mutation Data", data)
            if (data.id) {
                // Update if id exists
                return await updateDayBookService(data)
            }
            // Otherwise create
            return await storeDayBookService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("DayBook mutation failed:", error)
        },
    })
}