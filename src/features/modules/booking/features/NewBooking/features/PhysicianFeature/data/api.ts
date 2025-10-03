import type { IPhysicianListResponse, IPhysicianRequest, IPhysicianResponse } from "./schema";
import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";



export async function storePhysicianService(payload: IPhysicianRequest):Promise<AxiosResponse<IPhysicianResponse>>{
    try{
        const response = await axiosClient.post('/physicians',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IPhysicianResponse>;
        }
        throw new Error("Network Error");
    }
}


export async function getPhysicianService():Promise<AxiosResponse<IPhysicianListResponse>>{
    try{
        const response = await axiosClient.get('/physicians');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IPhysicianListResponse>;
        }
        throw new Error("Network Error");
    }
}