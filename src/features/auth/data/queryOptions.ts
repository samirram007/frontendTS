import { queryOptions, useQuery } from "@tanstack/react-query"
import { fetchProfileService } from "./api"




const BASE_KEY = "profile";

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfileService,
        retry: 1,
        // enabled: true
    })
}


export const profileQueryOptions = () => {
    return queryOptions({
        queryKey: [BASE_KEY],
        queryFn: () => fetchProfileService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};
