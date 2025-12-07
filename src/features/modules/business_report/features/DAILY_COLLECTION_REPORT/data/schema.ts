import { z } from "zod";



export const dailyCollectionRequest = z.object({
    startDate: z.string(),
    endDate: z.string(),
});

export type DailyCollectionRequest = z.infer<typeof dailyCollectionRequest>;


export const dailyCollectionReport = z.object({
    id: z.number().positive(),
    name: z.string(),
    status: z.string(),
    total_booking_amount: z.string().nullish(),
    total_discount_amount: z.string().nullish(),
    total_cancellation_amount: z.string().nullish(),
    refund: z.string().nullish(),
    discount_return: z.string().nullish(),
    due_cash_amount: z.string().nullish(),
    due_bank_amount: z.string().nullish(),
    curr_total_cash: z.string().nullish(),
    curr_bank_amount: z.string().nullish(),
    net_balance: z.string().nullish()
});

export type DailyCollectionReport = z.infer<typeof dailyCollectionReport>;
export const dailyCollectionReportList = z.array(dailyCollectionReport);
export type DailyCollectionReportList = z.infer<typeof dailyCollectionReportList>;


export interface IDailyCollectionReportResponse {
    message: string,
    status: boolean,
    code: number,
    success: boolean,
    data: DailyCollectionReportList
}