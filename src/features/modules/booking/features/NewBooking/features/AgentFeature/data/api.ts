import type { IAgent, IAgentListResponse, IAgentResponse } from "./schema";
import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";



export async function storeAgentService(payload: IAgent):Promise<AxiosResponse<IAgentResponse>>{
    try{
        const response = await axiosClient.post('/agents',payload);
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IAgentResponse>;
        }
        throw new Error("Network Error");
    }
}


export async function getAgentService():Promise<AxiosResponse<IAgentListResponse>>{
    try{
        const response = await axiosClient.get('/agents');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IAgentListResponse>;
        }
        throw new Error("Network Error");
    }
}