import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import type { IBookingResponse } from "../../NewBooking/data/schema";
import type { IBookingPaymentSchema, IJobOrderResponse, IJobOrderStoreSchema, ITestCancellationRequest, ITestCancellationResponse, ITestCancelRequest } from "./schema";
import axios from "axios";



export async function storeBookingPaymentService(payload: IBookingPaymentSchema): Promise<AxiosResponse<IBookingResponse>> {
    try {
        const response = await axiosClient.post('/booking_confirmation', payload);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}


export async function storeJobOrderService(payload: IJobOrderStoreSchema): Promise<AxiosResponse<IJobOrderResponse>> {
    try {
        const response = await axiosClient.post('/job_orders', payload);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}

export async function updateJobOrderService(payload: IJobOrderStoreSchema): Promise<AxiosResponse<IJobOrderResponse>> {
    try {
        const response = await axiosClient.put(`/job_orders/${payload.id}`, payload);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}

export async function deleteRequestTest(payload: ITestCancelRequest): Promise<AxiosResponse<ITestCancellationResponse>> {
    try {
        const response = await axiosClient.post(`test_booking/${payload.id}/test-cancel-request`, payload.remark);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}


export async function refundRequestTest(payload: ITestCancelRequest): Promise<AxiosResponse<ITestCancellationResponse>> {
    try {
        const response = await axiosClient.post(`test_booking/${payload.id}/test-refund-request`, { remark: payload.remark ?? null, cancellationRemark: payload.cancellationRemark });
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data
        }
        throw new Error("Network Error");
    }
}



export async function testCancelRequest(payload: ITestCancellationRequest) {
    try {
        const response = await axiosClient.post("test_cancellation_requests", payload);
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}


export async function testCancelDiscard(payload: ITestCancellationRequest) {
    try {
        const response = await axiosClient.put(`test_cancellation_requests/${payload.id}`, {
            status: payload.status,
            remarks: payload.remarks
        });
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        }
        throw new Error("Network Error");
    }
}