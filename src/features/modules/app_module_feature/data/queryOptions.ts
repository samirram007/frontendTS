import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import type { AppModuleFeatureForm } from "../types/types"
import { deleteAppModuleFeatureService, fetchAppModuleFeatureService, storeAppModuleFeatureService, updateAppModuleFeatureService } from "./api"
const Key = "AppModuleFeatures"
export const appModuleFeatureQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchAppModuleFeatureService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useAppModuleFeatureMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: AppModuleFeatureForm & { id?: number }) => {
            console.log("mutation Data", data)
            if (data.id) {
                // Update if id exists
                return await updateAppModuleFeatureService(data)
            }
            // Otherwise create
            return await storeAppModuleFeatureService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("AppModuleFeature mutation failed:", error)
        },
    })
}
export function useAppModuleFeatureDeleteMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            // console.log("Deleting feature id:", id)
            return await deleteAppModuleFeatureService({ id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("AppModuleFeature mutation failed:", error)
        },
    }
    )
}