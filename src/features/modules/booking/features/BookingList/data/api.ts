import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { IAllBookingResponse } from "./schema";


export async function getBookingListService():Promise<AxiosResponse<IAllBookingResponse>>{
    try{
        const response = await axiosClient.get('/bookings');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}
