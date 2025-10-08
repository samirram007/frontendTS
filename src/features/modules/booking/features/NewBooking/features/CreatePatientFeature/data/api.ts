import type {IPatient, IPatientListResponseDetail, IPatientResponseDetail } from "./schema";
import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";



export async function storePatientService(payload: IPatient):Promise<AxiosResponse<IPatientResponseDetail>>{
    try{
        const response = await axiosClient.post('/patients',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error)){
            throw error
        }
        throw new Error("Network Error");
    }
}


export async function getPatientService():Promise<AxiosResponse<IPatientListResponseDetail>>{
    try{
        const response = await axiosClient.get('/patients');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IPatientListResponseDetail>;
        }
        throw new Error("Network Error");
    }
}


export async function updatePatientService(payload: IPatient):Promise<AxiosResponse<IPatientResponseDetail>>{
    try{
        const response = await axiosClient.put(`/patients/${payload.id}`,payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response && error.response.data.success == false){
            return error.response as AxiosResponse<IPatientResponseDetail>;
        }
        throw new Error("Network Error");
    }
}