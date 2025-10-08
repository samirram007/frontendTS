import type { IDiscipline, IDisciplineListResponse, IDisciplineResponse, IPhysician, IPhysicianListResponse, IPhysicianRequest, IPhysicianResponse } from "./schema";
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


export async function updatePhysicianService(paylod: IPhysician):Promise<AxiosResponse<IPhysicianResponse>>{
    try{
        const response = await axiosClient.get(`/physicians/${paylod.id}`);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IPhysicianResponse>;
        }
        throw new Error("Network Error");
    }
}




// Store Discipline Service
export async function storeDisciplineService(payload: IDiscipline):Promise<AxiosResponse<IDisciplineResponse>>{
    try{
        const response = await axiosClient.post('/disciplines',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            error.response as AxiosResponse<IDisciplineResponse>;
            throw new Error("Validation Error");
        }
        throw new Error("Network Error");
    }
}


// Update Discipline Service
export async function updateDisciplineService(payload: IDiscipline):Promise<AxiosResponse<IDisciplineResponse>>{
    try{
        const response = await axiosClient.post(`/disciplines/${payload.id}`,payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            error.response as AxiosResponse<IDisciplineResponse>;
            throw new Error("Validation Error");
        }
        throw new Error("Network Error");
    }
}



// get all disciplines
export async function getAllDisciplineService():Promise<AxiosResponse<IDisciplineListResponse>>{
    try{
        const response = await axiosClient.get('/disciplines');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            const errors = error.response as AxiosResponse<IDisciplineListResponse>;
            console.log(errors,"Erros");
            throw new Error("Error encountered");
        }
        throw new Error("Network error");
    }
}