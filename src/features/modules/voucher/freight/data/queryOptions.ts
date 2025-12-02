import { queryOptions } from "@tanstack/react-query"
import { fetchFreightService } from "./api"
const queryKey = "Freight"
export const freightQueryOptions = (key: string = 'freight') => {

    return queryOptions({
        queryKey: [queryKey, key],
        queryFn: () => fetchFreightService(key),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
