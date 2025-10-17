import { useMutation, useQuery } from "@tanstack/react-query"
import {  getPatientService, storePatientService, updatePatientService } from "./api"
import type { IPatient } from "./schema"








export function usePatientMutation() {
    return useMutation({
        mutationFn: async (data: IPatient) => {
            if (data.id != 0 && data.id != undefined) {
                // Update if id exists
                return await updatePatientService(data)
            }
            // Otherwise create
            return await storePatientService(data)
        },
        onSuccess: () => {
        },
        onError: (error) => {
            console.error("Stock Physician mutation failed:", error)
        },
    })
}



export function useGetPatientListQuery(){
    return useQuery({
        queryKey:['get-patient-query'],
        queryFn: getPatientService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}