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
  testItem: testItemSchema
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