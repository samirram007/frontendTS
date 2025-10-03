import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAgentService, storeAgentService } from "./api"
import type { IAgent } from "./schema"
import { useAgent } from "../context/agent-context"
import { usePatient } from "@/features/modules/booking/contexts/patient-context"
import type { IPatient } from "../../CreatePatientFeature/data/schema"








export function useAgentMutation() {
    const queryClient = useQueryClient()
    const {setAgentDetail} = useAgent();
    const {setPatient} = usePatient();

    return useMutation({
        mutationFn: async (data: IAgent) => {
            // if (data.id) {
            //     // Update if id exists
            //     return await updateStockItemService(data)
            // }
            // Otherwise create
            return await storeAgentService(data)
        },
        onSuccess: (data) => {
            if(data){
                setPatient((prev)=>{
                    return prev ?
                        {
                            ...prev,
                            agent: data.data.data
                        }
                        :
                        { agent: data.data.data } as IPatient;
                });
                setAgentDetail(data.data.data);
            }
            queryClient.invalidateQueries({ queryKey: ['get-agent-query'] })
        },
        onError: (error) => {
            console.error("Stock Item mutation failed:", error)
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