import type { AxiosResponse } from "axios";
import type { IBusinessReportResponse } from "./schema";
import axiosClient from "@/utils/axios-client";
import axios from "axios";



export async function getAllBusinessReport(): Promise<AxiosResponse<IBusinessReportResponse>> {
    try {
        const response = await axiosClient.get(`/business_reports`);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}
