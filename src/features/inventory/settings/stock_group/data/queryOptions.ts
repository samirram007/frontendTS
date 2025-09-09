import { queryOptions } from "@tanstack/react-query"
import { fetchStockGroupService } from "./api"
const Key = "StockGroups"
export const stockGroupQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchStockGroupService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}