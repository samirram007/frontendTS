import type { AxiosResponse } from "axios";
import type { IBookingListResponse, IBookingResponse, IBookingTest } from "./schema";
import axiosClient from "@/utils/axios-client";
import axios from "axios";




export async function storeBookingService(payload: IBookingTest):Promise<AxiosResponse<IBookingResponse>>{
    try{
        const response = await axiosClient.post('/test_bookings',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}



export async function getAllBookingService():Promise<AxiosResponse<IBookingListResponse>>{
    try{
        const response = await axiosClient.get('/test_bookings');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}
export async function fetchByIdBookingService(id:number):Promise<AxiosResponse<IBookingResponse>>{
    try{
        const response = await axiosClient.get(`/test_bookings/${id}`);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}