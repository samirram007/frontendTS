import type { AxiosResponse } from "axios";
import type { ISampleCollectorResponse } from "./schema";
import axios from "axios";
import axiosClient from "@/utils/axios-client";






export async function getAllSampleCollectors():Promise<AxiosResponse<ISampleCollectorResponse>>{
    try{
        const response = await axiosClient.get('/sample_collectors');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}