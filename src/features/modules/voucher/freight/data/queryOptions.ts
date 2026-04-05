import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchFreightByIdService, fetchFreightReportService, fetchFreightService, storeFreightService, storeVoucherDispatchDetailService, updateFreightService, updateVoucherDispatchDetailService } from "./api"
import type { FreightForm } from "./schema"
import type { VoucherDispatchDetailForm } from "../../stock_journal/data/schema"
const queryKey = "Freight"
export const freightQueryOptions = (key: string = 'freight', id?: number,) => {



    return queryOptions({
        queryKey: id ? [queryKey, id] : [queryKey],
        queryFn: () => {
            return id ? fetchFreightByIdService(key, id) : fetchFreightService(key)
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })

}
export const freightReportQueryOptions = (key: string = 'freight_report') => {

    return queryOptions({
        queryKey: ['FreightReport', key],
        queryFn: () => fetchFreightReportService(key),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export const useFreightMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: FreightForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateFreightService(data)
            }
            // Otherwise create
            return await storeFreightService(data)
        },
        onSuccess: () => {
            console.log("Hello Key", queryKey)
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (error) => {
            console.error("Transporter mutation failed:", error)
        },
    })
}
export const useVoucherDispatchDetailMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: VoucherDispatchDetailForm & { id?: number }) => {
            console.log("data", data,)
            if (data.id) {
                // Update if id exists
                return await updateVoucherDispatchDetailService(data)
            }
            // Otherwise create
            return await storeVoucherDispatchDetailService(data)
        },
        onSuccess: () => {
            // console.log("are you here?")
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (error) => {
            console.error("Dispatch mutation failed:", error)
        },
    })
}
