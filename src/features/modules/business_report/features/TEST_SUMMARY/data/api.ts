import type { AxiosResponse } from "axios";
import type { ITestSummaryReportResponse, ITestSummaryRequest } from "./schema";
import axiosClient from "@/utils/axios-client";
import axios from "axios";






export async function getAllDepartmentTestSummaryReport(request: ITestSummaryRequest): Promise<AxiosResponse<ITestSummaryReportResponse>> {
    try {
        const response = await axiosClient.get(`business_reports/test_summary/${request.startDate}/${request.endDate}`);
        return response;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<ITestSummaryReportResponse>;
        }
        throw new Error("Network Error");
    }
}
export async function getDepartmentTestSummaryReport(request: ITestSummaryRequest): Promise<AxiosResponse<ITestSummaryReportResponse>> {
    try {
        const response = await axiosClient.get(`business_reports/test_summary/${request.startDate}/${request.endDate}/${request.departmentId}`);
        return response;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<ITestSummaryReportResponse>;
        }
        throw new Error("Network Error");
    }
}