import type { IResponseInterface } from "../../../data/schema";
import type { IStockCategory, IStockItem, IVoucherPatient } from "../../NewBooking/data/schema";
import { z } from "zod";



export interface IBookingPaymentSchema {
    voucherId: number,
    voucherTypeId: number,
    amount: number,
    patientId: number,
    paymentMode: number,
    transactionNo?: string | null
}

export enum JobStatus {
    Booked = 'Booked',
    SampleCollected = 'SampleCollected',
    InProcess = 'InProcess',
    Completed = 'Completed',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    Drafted = 'Drafted',
}

export enum TestCancellationStatus {
    CancellationRequest = 'request',
    CancellationDiscard = 'discard',
    CancellationApproved = 'approved'
}



export interface IJobOrderStoreSchema {
    id?: number,
    stockJournalEntryId: number,
    stockJournalId?: number,
    stockItemId: number,
    status: string,
    startDate?: string | Date,
    endDate?: string | Date,
    voucherId?: number
}

export interface IJobOrderResponse extends IResponseInterface {
    data: {
        id: number;
        stockJournalEntryId: number;
        status: string;
        stockItemId: number;
    }

}



export interface IDepartmentData {
    stockItem: IStockItem,
    stockCategory: IStockCategory,
    voucherNo: string,
    testDate: Date,
    reportDate: Date,
    voucherDate: string,
    voucherPatient: IVoucherPatient | undefined,
}

// department slip interface
export interface IDepartmentSlipData {
    categoryName: string,
    data: IDepartmentData[]
}


export interface ITestCancelRequest {
    id: number,
    remark: string | null,
    cancellationRemark: string | null
}

export interface ITestCancellationResponse {
    status: boolean,
    code: number,
    message: string
}


export interface ITestCancellationRequest {
    id?: number,
    stockJournalEntryId?: number,
    voucherId?: number,
    remarks: string | null,
    status: TestCancellationStatus
}

export interface ITestCancellation {
    id?: number,
    stockJournalEntryId: number,
    status: string,
    cancelledBy: number,
    requestedBy: number,
    approvedBy: number
}


export interface ITestCancellationResponse extends IResponseInterface {
    data: ITestCancellation
}


export const voucherEntrySchema = z.object({
    id: z.number(),
    voucherId: z.number(),
    entryOrder: z.number(),
    accountLedgerId: z.number(),
    debit: z.string(),
    credit: z.string(),
    remarks: z.string().nullable()
});

export type IVoucherEntry = z.infer<typeof voucherEntrySchema>;
export const voucherEntryListSchema = z.array(voucherEntrySchema);
export type IVoucherEntryList = z.infer<typeof voucherEntryListSchema>;

export const voucherReferSchema = z.object({
    id: z.number(),
    voucherNo: z.string(),
    voucherDate: z.string(),
    voucherTypeId: z.number(),
    remarks: z.string().nullable(),
    status: z.string(),
    fiscalYearId: z.number(),
    companyId: z.number(),
    stockJournalId: z.number(),
    voucherEntries: voucherEntryListSchema.nullable(),
});

export const voucherReferenceSchema = z.object({
    id: z.number(),
    voucherId: z.number(),
    voucherReferenceId: z.number(),
    voucher: voucherReferSchema.nullable()
});

export const voucherSchema = z.object({
    id: z.number(),
    voucherNo: z.string(),
    voucherDate: z.string(),
    voucherTypeId: z.number(),
    remarks: z.string().nullable(),
    status: z.string(),
    fiscalYearId: z.number(),
    companyId: z.number(),
    stockJournalId: z.number(),
    voucherEntries: voucherEntryListSchema.nullable(),
    voucherReferences: z.array(voucherReferenceSchema).nullable()
});



export type IVoucherSchema = z.infer<typeof voucherSchema>;

export interface IPaymentVoucherResponse extends IResponseInterface {
    data: IVoucherSchema
}

