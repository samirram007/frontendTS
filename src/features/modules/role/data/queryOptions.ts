import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchRoleService, storeRoleService, updateRoleService } from "./api"
import type { RoleForm } from "./schema"
//queryOptions.ts
const Key = "roles"
export const roleQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchRoleService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useRoleMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: RoleForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateRoleService(data)
            }
            // Otherwise create
            return await storeRoleService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Role mutation failed:", error)
        },
    })
}