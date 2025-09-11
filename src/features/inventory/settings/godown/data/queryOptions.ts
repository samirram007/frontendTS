import { queryOptions } from "@tanstack/react-query"
import { fetchGodownService } from "./api"

const Key = "godowns"
export const godownQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchGodownService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}