import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPurchaseOrderByIdService, fetchPurchaseOrderService, storePurchaseOrderService, updatePurchaseOrderService } from "./api"
import type { PurchaseOrderForm } from "./schema"
import { useNavigate } from "@tanstack/react-router"
import { Route as DayBookRoute } from '@/routes/_protected/reports/day_book/_layout/index'

const BASE_KEY = "purchaseOrder"

export const purchaseOrderQueryOptions = (id?: number) => {
    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () => id ? fetchPurchaseOrderByIdService(id) : fetchPurchaseOrderService(),
        staleTime: id ? 1000 : 1000 * 60 * 1,
        retry: 1,
    })
}

export function usePurchaseOrderMutation() {
    const queryClient = useQueryClient()
        const navigate = useNavigate()
    const Key = "PurchaseOrders"
    return useMutation({
        mutationFn: async (data: PurchaseOrderForm & { id?: number }) => {
            if (data.id) {
                return await updatePurchaseOrderService(data)
            }
            return await storePurchaseOrderService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
            navigate({ to: DayBookRoute.to })
        },
        onError: (error) => {
            console.error("PurchaseOrder mutation failed:", error)
        }
    })
}