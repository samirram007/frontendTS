import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllDiscountByIdService, getAllDiscountService } from "./api";

const BASE_KEY = "discount_type_key";




export const dicountTypeQueryOptions = (id:number) =>{
    return queryOptions({
        queryKey:  [BASE_KEY,id],
        queryFn:()=>  getAllDiscountByIdService(id),
        staleTime: Infinity,
        retry:1
    });
}


export const useGetAllDiscountTypes = () =>{
    return useQuery({
        queryKey: [BASE_KEY],
        queryFn: getAllDiscountService,
        retry: 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}