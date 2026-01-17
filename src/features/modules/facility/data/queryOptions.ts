import { queryOptions } from "@tanstack/react-query";
import { fetchFacilitiesService } from "./api";





const BASE_KEY = "facilities";


export const facilityQueryOptions = () => {
    return queryOptions({
        queryKey: [BASE_KEY],
        queryFn: () => fetchFacilitiesService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    })
}