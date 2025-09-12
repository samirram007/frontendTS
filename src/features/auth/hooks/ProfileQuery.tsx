import { useQuery } from "@tanstack/react-query"
import { fetchUserProfileService } from "../services/apis"








export const useGetUserProfile = () =>{
    return useQuery({
        queryKey:['userProfile'],
        queryFn: fetchUserProfileService,
        retry:1,
        staleTime: Infinity,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        refetchOnReconnect:false,
        enabled:true
    });
}