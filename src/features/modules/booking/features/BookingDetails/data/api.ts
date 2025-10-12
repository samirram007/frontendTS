import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import type { IBookingResponse } from "../../NewBooking/data/schema";
import type { IBookingPaymentSchema } from "./schema";
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
