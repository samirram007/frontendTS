import { useMutation, useQuery } from "@tanstack/react-query"
import { getAgentService, storeAgentService, updateAgentService } from "./api"
import type { IAgent } from "./schema"
import { showErrors } from "@/utils/dataClient"








export function useAgentMutation() {

    return useMutation({
        mutationFn: async (data: IAgent) => {
            if (data.id != 0 && data.id != undefined) {
                // Update if id exists
                return await updateAgentService(data)
            }
            // Otherwise create
            return await storeAgentService(data)
        },
        onError: (error) => {
            showErrors(error);
            
        },
    })
}



export function useGetAgentListQuery(){
    return useQuery({
        queryKey:['get-agent-query'],
        queryFn: getAgentService,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
}