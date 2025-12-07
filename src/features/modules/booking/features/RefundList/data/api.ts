import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";
import type { IRefundRequestResponse } from "./schema";




export async function getCancelledBookingListService(): Promise<AxiosResponse<IRefundRequestResponse>> {
    try {
        const response = await axiosClient.get('/test_booking/get-all-cancelled-tests');
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}
