// import axiosClient from "@/utils/axios-client";
// import axios, { type AxiosResponse } from "axios";
// import type { IJobOrderListResponse, IJobOrderResponse } from "./schema";
import axiosClient from "@/utils/axios-client";
import { getData } from "@/utils/dataClient";
import type { AxiosError, AxiosResponse } from "axios";
import type { IReportUploadRequest, IReportUploadResponse } from "./schema";



// export async function fetchJobOrderByIdService(id:number):Promise<AxiosResponse<IJobOrderResponse>>{
//     try{
//         const response = await axiosClient.get(`/job_orders/${id}`);
//         return response;
//     }catch(error:unknown){
//         if(axios.isAxiosError(error) && error.response){
//             throw error.response.data
//         }
//         throw new Error("Network Error");
//     }
// }

// export async function fetchJobOrdersService():Promise<AxiosResponse<IJobOrderListResponse>>{
//     try{
//         const response = await axiosClient.get(`/job_orders`);
//         return response;
//     }catch(error:unknown){
//         if(axios.isAxiosError(error) && error.response){
//             throw error.response.data
//         }
//         throw new Error("Network Error");
//     }
// }
const API_PATH = "job_orders";


export async function fetchJobOrderByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}
export async function fetchJobOrdersService() {
    return await getData(`${API_PATH}`)
}



export async function postUploadReport(request:IReportUploadRequest):Promise<AxiosResponse<IReportUploadResponse>>{
    try{
        const formData = new FormData();
        formData.append("report_file",request.file);

        const response = await axiosClient.post(`job_orders/${request.id}/upload-report`,formData,{
            headers:{
                "Content-Type" : "multipart/form-data",
                "Accept":"application/json"
            }
        });
        return response;
    }catch(error:unknown){
        const RError = error as AxiosError<IReportUploadResponse>;
        if(RError.response?.data.success == false)
            {
                throw new Error(RError.response.data.message);
            }
            else{
                throw new Error("Data not found");
            }
        throw new Error("Network Error");
    }
}