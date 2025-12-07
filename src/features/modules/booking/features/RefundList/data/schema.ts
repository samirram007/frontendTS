import type { IResponseInterface } from "../../../data/schema";
import type { IStockJournal, IVoucherEntry, IVoucherPatient, IVoucherReference } from "../../NewBooking/data/schema";
import { z } from "zod";






export interface IRefund {
    id: number,
    voucherNo: string,
    voucherDate: string,
    voucherTypeId: number,
    remarks: string,
    status: string,
    fiscalYearId: number,
    companyId: number,
    stockJournalId: number,
    stockJournal: IStockJournal,
    voucherEntries: IVoucherEntry[],
    voucherPatient: IVoucherPatient,
    voucherReferences: IVoucherReference[]
}



export interface IRefundResponse extends IResponseInterface {
    data: IRefund[]
}

export const refundRequest = z.object({
    voucher_id: z.number(),
    booking_no: z.string(),
    booking_date: z.string(),
    remarks: z.string().nullish(),
    amount: z.string(),
    test_date: z.string(),
    report_date: z.string(),
    test_name: z.string(),
    patient_name: z.string(),
    patient_age: z.string().nullish(),
    patient_gender: z.string().nullish(),
    patient_contact: z.string().nullish(),
    agent_name: z.string().nullish(),
    physician_name: z.string().nullish(),
});

export const refundParentRequest = z.object({
    booking_no: z.string(),
    booking_date: z.string(),
    patient_name: z.string(),
    tests: refundRequest
})


export type RefundRequest = z.infer<typeof refundRequest>;
export type RefundParent = z.infer<typeof refundParentRequest>;
export const refundRequstList = z.array(refundRequest);
export type RefundRequestList = z.infer<typeof refundRequstList>;




export interface IRefundRequestResponse {
    message: string,
    status: boolean,
    code: number,
    success: boolean,
    data: RefundRequestList
}