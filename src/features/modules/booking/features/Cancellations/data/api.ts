import type { AxiosResponse } from "axios";
import axiosClient from "@/utils/axios-client";
import axios from "axios";
import type { ITestCancellationListResponse, ITestCancellationResponse } from "./schema";




export async function getCancelledBookingListService(): Promise<AxiosResponse<ITestCancellationListResponse>> {
    try {
        const response = await axiosClient.get("/test_cancellation_requests");
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}



export async function getCancelledBookingListServiceById(bookingNo: string): Promise<AxiosResponse<ITestCancellationResponse>> {
    try {
        const response = await axiosClient.get(`test_cancellation_requests/get-by-booking/${bookingNo}`);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}
