import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import type { IBookingPaymentSchema, IJobOrderStoreSchema, ITestCancellationRequest, ITestCancelRequest } from "./schema";
import { deleteRequestTest, getPaymentVoucherById, refundRequestTest, storeBookingPaymentService, storeJobOrderService, testCancelDiscard, testCancelRequest, updateJobOrderService } from "./api";
import { showErrors } from "@/utils/dataClient";

const PAYMENT_VOUCHER_KEY = "payment-voucher-key";

export function useBookingPaymentMutation() {
    return useMutation({
        mutationFn: async (data: IBookingPaymentSchema) => {
            // if (data.id != 0 && data.id != undefined) {
            //     // Update if id exists
            //     return await updateAgentService(data)
            // }
            // Otherwise create
            return await storeBookingPaymentService(data)
        },
        onError: (error) => {
            showErrors(error);

        },
    })
}


export function useTestBookingCancelMutation() {
    return useMutation({
        mutationFn: async (payload: ITestCancelRequest) => {
            return await deleteRequestTest(payload);
        },
        onError: (error) => {
            showErrors(error);

        },
    })
}


export function useTestBookingRefundRequestMutation() {
    return useMutation({
        mutationFn: async (payload: ITestCancelRequest) => {
            console.log("payload", payload);
            return await refundRequestTest(payload);
        },
        onError: (error) => {
            showErrors(error);

        },
    })
}

export function useJobOderMutation() {
    return useMutation({
        mutationFn: async (data: IJobOrderStoreSchema) => {
            if (data.id != 0 && data.id != undefined) {
                // Update if id exists
                return await updateJobOrderService(data)
            }
            // Otherwise create
            return await storeJobOrderService(data)
        },
        onError: (error) => {
            showErrors(error);

        },
    })
}


// This changes has been done due the test cancellation process addition

export function useTestCancellation() {
    return useMutation({
        mutationFn: async (payload: ITestCancellationRequest) => {
            if (payload.id) {
                return await testCancelDiscard(payload);
            }
            return await testCancelRequest(payload);
        },
        onError: (error) => {
            showErrors(error);

        },
    })
}




export function useGetPaymentDetailVoucher(id: number) {
    return useQuery({
        queryKey: [PAYMENT_VOUCHER_KEY, id],
        queryFn: () => getPaymentVoucherById(id),
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 22000,
        retry: 2,
        enabled: id > 0
    });
}


export function paymentDetailVoucher(id: number) {
    return queryOptions({
        queryKey: [PAYMENT_VOUCHER_KEY, id],
        queryFn: () => getPaymentVoucherById(id),
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 22000,
        retry: 2,
        enabled: id > 0
    })
}