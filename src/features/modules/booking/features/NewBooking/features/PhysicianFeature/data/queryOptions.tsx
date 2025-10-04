import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllDisciplineService, getPhysicianService, storeDisciplineService, storePhysicianService, updateDisciplineService, updatePhysicianService } from "./api"
import type { IDiscipline, IPhysician } from "./schema"




export function usePhysicianMutation() {
    return useMutation({
        mutationFn: async (data: IPhysician) => {
            if (data.id != 0 && data.id != undefined) {
                // Update if id exists
                return await updatePhysicianService(data)
            }
            // Otherwise create
            return await storePhysicianService(data)
        },
        onSuccess: () => {
        },
        onError: (error) => {
            console.error("Stock Physician mutation failed:", error)
        },
    })
}



export function useGetPhysicianListQuery(){
    return useQuery({
        queryKey:['get-physician-query'],
        queryFn: getPhysicianService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}



// Discipline Mutation and Query
export function useDisciplineMutation(){
    return useMutation({
        mutationFn: async (data:IDiscipline)=>{
            if(data.id != 0 && data.id != undefined){
                return await updateDisciplineService(data);
            }
            return await storeDisciplineService(data);
        },
    });
}



export function useGetDisciplineListQuery(){
    return useQuery({
        queryKey:['get-discipline-query'],
        queryFn: getAllDisciplineService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}
