import type { IResponseInterface } from "../../../data/schema";
import type { IVoucherEntry } from "../../NewBooking/data/schema";
import type { IAgent } from "../../NewBooking/features/AgentFeature/data/schema";
import type { IPatient } from "../../NewBooking/features/CreatePatientFeature/data/schema";
import type { IPhysician } from "../../NewBooking/features/PhysicianFeature/data/schema";

export interface IVoucher {
  id: number;
  voucherNo: string;
  voucherDate: string;
  voucherTypeId: number;
  remarks: string | null;
  status: "active" | "inactive";
  fiscalYearId: number;
  companyId: number;
  stockJournalId: number;
  voucherEntries?: IVoucherEntry[]
}


export interface IAllBooking {
  id: number;
  voucherId: number;
  patientId: number;
  agentId: number;
  physicianId: number;
  patient: IPatient;
  agent: IAgent;
  physician: IPhysician;
  voucher: IVoucher
}


export interface IAllBookingResponse extends IResponseInterface{
    data: IAllBooking[]
}
