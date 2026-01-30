import { Route as DayBookRoute } from '@/routes/_protected/reports/day_book/_layout/index'
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { fetchPhysicalStockByIdService, fetchPhysicalStockService, storePhysicalStockService, updatePhysicalStockService } from "./api"
import type { PhysicalStockForm } from "./schema"

const BASE_KEY = "physicalStock"

export const physicalStockQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchPhysicalStockByIdService(id) : fetchPhysicalStockService(),
        staleTime: id ? 1000 : 1000 * 60 * 1, // 1 minute
        retry: 1,
    })
}

export function usePhysicalStockMutation() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const Key = "PhysicalStocks"
    return useMutation({
        mutationFn: async (data: PhysicalStockForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updatePhysicalStockService(data)
            }
            // Otherwise create
            return await storePhysicalStockService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
            queryClient.invalidateQueries({ queryKey: ['DayBooks'] })
            queryClient.invalidateQueries({ queryKey: ["godownItemStocks"] })
            queryClient.invalidateQueries({ queryKey: ["batches"] })
            queryClient.invalidateQueries({ queryKey: ["stockItems"] })

            navigate({ to: DayBookRoute.to })
        },
        onError: (error) => {
            console.error("PhysicalStock mutation failed:", error)
        },
    })
}