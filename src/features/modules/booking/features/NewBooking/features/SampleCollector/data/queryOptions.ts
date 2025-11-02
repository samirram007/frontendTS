import { useQuery } from "@tanstack/react-query"
import { getAllSampleCollectors } from "./api";


const BASE_KEY = "sample-collector-key";


export const useGetAllSampleCollectors = () =>{
    return useQuery({
        queryKey: [BASE_KEY],
        queryFn: getAllSampleCollectors,
        retry:1,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
        enabled: true
    });
}