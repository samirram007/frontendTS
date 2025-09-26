import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStockUnitService } from "./api";
import type { StockUnit } from "./schema";
const Key = "StockUnits"
export const stockUnitQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchStockUnitService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export const stockUnitMuatationOptions = (payload: StockUnit, key: string = Key) => {
    const queryClient = useQueryClient()
    useMutation({
        mutationKey: [key],
        mutationFn: async () => {
            // Here you can call your API to create or update the stock unit
            // For example:
            // return await createOrUpdateStockUnitService(payload);
            return payload; // Placeholder, replace with actual API call
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [key] })
        }
    })
}