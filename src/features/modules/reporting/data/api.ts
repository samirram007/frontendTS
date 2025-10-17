import axiosClient from "@/utils/axios-client";
import axios, { type AxiosResponse } from "axios";
import type { IJobOrderListResponse, IJobOrderResponse } from "./schema";
import { getData } from "@/utils/dataClient";



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