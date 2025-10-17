import { useMutation } from "@tanstack/react-query";
import type { IBookingPaymentSchema, IJobOrderStoreSchema } from "./schema";
import { storeBookingPaymentService, storeJobOrderService, updateJobOrderService } from "./api";
import { showErrors } from "@/utils/dataClient";


export function useBookingPaymentMutation() {
    


    return useMutation({
        mutationFn: async (data: IBookingPaymentSchema) => {
            // if (data.id != 0 && data.id != undefined) {
            //     // Update if id exists
            //     return await updateAgentService(data)
            // }
            // Otherwise create
            return await storeBookingPaymentService(data)
        },
        onError: (error) => {
            showErrors(error);
            
        },
    })
}

export function useJobOderMutation() {
    return useMutation({
        mutationFn: async (data: IJobOrderStoreSchema) => {
            if (data.id != 0 && data.id != undefined) {
                // Update if id exists
                return await updateJobOrderService(data)
            }
            // Otherwise create
            return await storeJobOrderService(data)
        },
        onError: (error) => {
            showErrors(error);
            
        },
    })
}
