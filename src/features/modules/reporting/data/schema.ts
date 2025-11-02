import {z} from "zod";
import { testItemSchema } from "../../test_item/data/schema";
import type { IResponseInterface } from "../../booking/data/schema";






export const reportTestSchema = z.object({
    doctorName: z.string().nullish(),
    reportdate: z.coerce.date().nullish(),
    template: z.string().nullish()
});

export type ReportTestType = z.infer<typeof reportTestSchema>;

export const JobOrderStatusEnum = z.enum([
  "booked",
  "sample_collected",
  "in_process",
  "completed",
  "delivered",
  "cancelled",
  "drafted",
]);

export type JobOrderStatus = z.infer<typeof JobOrderStatusEnum>;


const jobOrderAddressableSchema = z.object({
  id: z.number().nullable(),
  type: z.string().nullable(),
});

const jobOrderAddressSchema = z.object({
  id: z.number().nullable(),
  line1: z.string().nullable(),
  line2: z.string().nullable(),
  landmark: z.string().nullable(),
  postOffice: z.string().nullable(),
  district: z.string().nullable(),
  city: z.string().nullable(),
  stateId: z.number().nullable(),
  countryId: z.number().nullable(),
  postalCode: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  addressType: z.string().nullable(),
  isPrimary: z.boolean().nullable(),
  addressable: jobOrderAddressableSchema.nullable(),
});


const jobOrderPatientSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  age: z.number().nullable(),
  contactNo: z.string().nullable(),
  gender: z.string().nullable(),
  status: z.string().nullable(),
  agentId: z.number().nullable(),
  physicianId: z.number().nullable(),
  address:jobOrderAddressSchema
});

const jobOrderPhysicianSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  contactNo: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  degree: z.string().optional().nullable(),
  disciplineId: z.number().optional().nullable(),
});

const jobOrderVoucherPatientSchema = z.object({
  id: z.number().nullable(),
  voucherId: z.number().nullable(),
  patientId: z.number().nullable(),
  agentId: z.number().nullable(),
  physicianId: z.number().nullable(),
  patient: jobOrderPatientSchema.nullable(),
  physician: jobOrderPhysicianSchema
});

const jobOrderTestBookingSchema = z.object({
  id: z.number(),
  voucherNo: z.string(),
  voucherDate: z.coerce.date(),
  voucherTypeId: z.number(),
  remarks: z.string().nullable(),
  status: z.string().nullable(),
  fiscalYearId: z.number().nullable(),
  companyId: z.number().nullable(),
  stockJournalId: z.number().nullable(),
  voucherPatient:jobOrderVoucherPatientSchema
});



export const jobOrderSchema = z.object({
  id: z.number().int().positive(),
  stockJournalId: z.number().int().positive().nullish(),
  stockJournalEntryId: z.number().int().positive(),
  status: JobOrderStatusEnum,
  stockItemId: z.number().int().positive(),
  expectedStartDate: z.coerce.date().nullish(),
  expectedEndDate: z.coerce.date().nullish(),
  actualStartDate: z.coerce.date().nullish(),
  actualEndDate: z.coerce.date().nullish(),
  reportFile: z.coerce.string().nullable(),
  reportFilePath: z.coerce.string().nullable(),
  testItem: testItemSchema,
  testBooking: jobOrderTestBookingSchema
});


export type JobOrderType = z.infer<typeof jobOrderSchema>;
export const jobOrderListSchema = z.array(jobOrderSchema);
export type JobOrderListSchema = z.infer<typeof jobOrderListSchema>;


export interface IJobOrderResponse extends IResponseInterface{
    data: JobOrderType
}


export interface IJobOrderListResponse extends IResponseInterface{
    data: JobOrderListSchema
}





export interface IReportUploadResponse{
  success: boolean,
  message: string,
  file_path: string
}


export interface IReportUploadRequest{
  file: File,
  id: number
}