import type { ILabTestListItemResponse } from "./schema";
import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";



export async function getLabTestItemService():Promise<AxiosResponse<ILabTestListItemResponse>>{
    try{
        const response = await axiosClient.get('/stock_items');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<ILabTestListItemResponse>;
        }
        throw new Error("Network Error");
    }
}