import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { IDailyCollectionReportResponse } from "./schema";



export async function getDailyCollectionReport(): Promise<AxiosResponse<IDailyCollectionReportResponse>> {
    try {
        const response = await axiosClient.get(`business_reports/daily_collection`);
        return response;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<IDailyCollectionReportResponse>;
        }
        throw new Error("Network Error");
    }
}