import type { IResponseInterface } from "../../../data/schema";




export interface IBookingPaymentSchema{
    voucherId:number,
    amount:number,
    patientId : number,
    paymentMode:number
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



export interface IJobOrderStoreSchema{
    id?:number,
    stockJournalEntryId: number,
    stockJournalId?: number,
    stockItemId: number,
    status: string,
    start_date?: string | Date,
    end_date?: string | Date,
    voucher_id?: number
}

export interface IJobOrderResponse extends IResponseInterface {
    data:{
        id: number;
        stockJournalEntryId: number;
        status: string;
        stockItemId: number;
    }

}