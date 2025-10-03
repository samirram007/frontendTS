import type { IResponseInterface } from "@/features/modules/booking/data/schema";
import * as yup from "yup";



export interface IAgent{
    id?: number,
    name: string,
    email?: string,
    contactNo: string,
    accountLedgerId?: number,
    commissionPercent?: number,
    status: boolean
}


export interface IAgentResponse extends IResponseInterface{
    data: IAgent
}

export interface IAgentListResponse extends IResponseInterface{
    data: IAgent[]
}



export const agentSchema = yup.object({
    name: yup.string(),
    email: yup.string().optional(),
    contact_no: yup.string().optional(),
    account_ledger_id: yup.number().default(0),
    commission_percent: yup.number().optional(),
    status: yup.boolean().default(true)
});