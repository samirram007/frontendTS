import axios, { type AxiosResponse } from "axios";
import type { IDiscountListResponse, IDiscountResponse } from "./schema";
import axiosClient from "@/utils/axios-client";








export async function getAllDiscountService():Promise<AxiosResponse<IDiscountListResponse>>{
    try{
        const response = await axiosClient.get('discount_types');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}

export async function getAllDiscountByIdService(id:number):Promise<AxiosResponse<IDiscountResponse>>{
    try{
        const response = await axiosClient.get(`discount_types/${id}`);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}