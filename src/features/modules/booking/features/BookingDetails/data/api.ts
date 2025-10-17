import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import type { IBookingResponse } from "../../NewBooking/data/schema";
import type { IBookingPaymentSchema, IJobOrderResponse, IJobOrderStoreSchema } from "./schema";
import axios from "axios";



export async function storeBookingPaymentService(payload: IBookingPaymentSchema):Promise<AxiosResponse<IBookingResponse>>{
    try{
        const response = await axiosClient.post('/booking_confirmation',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}


export async function storeJobOrderService(payload: IJobOrderStoreSchema):Promise<AxiosResponse<IJobOrderResponse>>{
    try{
        const response = await axiosClient.post('/job_orders',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}

export async function updateJobOrderService(payload: IJobOrderStoreSchema):Promise<AxiosResponse<IJobOrderResponse>>{
    try{
        const response = await axiosClient.put(`/job_orders/${payload.id}`,payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}
