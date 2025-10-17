import { queryOptions } from "@tanstack/react-query"
import { fetchJobOrderByIdService, fetchJobOrdersService } from "./api"

const BASE_KEY = "job_orders_key"

export const jobOrderQueryOptions = (id?: number) => {
    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchJobOrderByIdService(id) : fetchJobOrdersService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}



