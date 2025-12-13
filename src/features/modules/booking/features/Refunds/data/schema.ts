import { z } from "zod";


export const refundRequest = z.object({
    id: z.number(),
    stockJournalEntryId: z.number(),
    bookingNo: z.string(),
    bookingDate: z.string(),
    remarks: z.string().nullable(),
    amount: z.string(),
    testDate: z.string(),
    reportDate: z.string(),
    testName: z.string(),
    patientName: z.string(),
    patientAge: z.string().nullish(),
    patientGender: z.string().nullish(),
    patientContact: z.string().nullish(),
    agentName: z.string().nullish(),
    physicianName: z.string().nullish(),
    status: z.string()
});

export const refundParentRequest = z.object({
    bookingNo: z.string(),
    bookingDate: z.string(),
    patientName: z.string(),
    tests: z.array(refundRequest)
});


export const refundDetailRequest = z.object({
    bookingNo: z.string(),
    bookingDate: z.string(),
    patientName: z.string(),
    patientAge: z.number(),
    patientGender: z.string(),
    patientContact: z.string(),
    agentName: z.string(),
    physicianName: z.string(),
    tests: z.array(refundRequest)
});


export type RefundRequest = z.infer<typeof refundRequest>;
export type RefundParent = z.infer<typeof refundParentRequest>;
export const refundRequstList = z.array(refundRequest);
export type RefundRequestList = z.infer<typeof refundRequstList>;
export type RefundDetailRequest = z.infer<typeof refundDetailRequest>




export interface IRefundRequestResponse {
    message: string,
    status: boolean,
    code: number,
    success: boolean,
    data: RefundRequestList
}


export interface IRefundDetailResponse {
    message: string,
    status: boolean,
    code: number,
    success: boolean,
    data: RefundDetailRequest
}