import type { IResponseInterface } from "../../../data/schema";
import type { IStockCategory, IStockItem, IVoucherPatient } from "../../NewBooking/data/schema";




export interface IBookingPaymentSchema {
    voucherId: number,
    amount: number,
    patientId: number,
    paymentMode: number
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
}

export interface ITestCancellationResponse {
    status: boolean,
    code: number,
    message: string
}


export interface ITestCancellationRequest {
    stockJournalEntryId: number,
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