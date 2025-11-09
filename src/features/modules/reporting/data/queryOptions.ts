import { queryOptions, useMutation } from "@tanstack/react-query"
import { delUploadReport, fetchJobOrderByIdService, fetchJobOrdersService, postUploadReport } from "./api"
import type { IReportUploadRequest } from "./schema"

const BASE_KEY = "job_orders_key";

export const jobOrderQueryOptions = (id?: number) => {
    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchJobOrderByIdService(id) : fetchJobOrdersService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}





export const useReportUploadMutation = () =>{
    return useMutation({
        mutationKey:['post-report-upload-mutate-key'],
        mutationFn: (request:IReportUploadRequest) => {
            return postUploadReport(request);
        }
    })
};




export const useReportDeleteMutation = () =>{
    return useMutation({
        mutationKey: ['del-report-mutate-key'],
        mutationFn: (id:number) => {
            return delUploadReport(id);
        }
    });
}