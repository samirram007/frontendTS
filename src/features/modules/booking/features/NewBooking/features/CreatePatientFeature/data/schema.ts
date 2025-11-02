import type { IResponseInterface } from "@/features/modules/booking/data/schema";
import type { IAgent } from "../../AgentFeature/data/schema";
import type { IPhysician } from "../../PhysicianFeature/data/schema";
import * as yup from 'yup';
import type { IAccountLedger } from "../../../data/schema";

// status type
type StatusType = "active" | "deactive";
// gender enum
type GenderType = "male" | "female" | "others";

export type AddressType = {
  line1: string,
  line2: string,
  city: string,
  landmark?: string,
  stateId?: number,
  countryId?: number,
  isPrimary: boolean,
  postalCode: string,
  latitude?: any,
  longitude?: any,
  addressType?: string,
  addressable?: {
    id: number,
    type: string
  }
}

export type IDiscountType = {
  id: number,
  name: string,
  code: string,
  isPercentage: boolean,
  value: string,
  accountLedgerId: number
}

//  Patient Interface for form to create and edit
export interface IPatient{
    id?: number,
    name: string,
    age: number,
    status: StatusType,
    gender: GenderType | undefined,
    contactNo: string,
    accountLedgerId?: number,
    agentId?: number,
    physicianId?: number,
    discountTypeId?: number | null,
    address?: AddressType,
    agent?: IAgent,
    physician?: IPhysician,
    accountLedger?: IAccountLedger,
    discountType?: IDiscountType
}

// Patient Response after create API called
export interface IPatientResponseDetail extends IResponseInterface{
    data: IPatient;
}

export interface IPatientListResponseDetail extends IResponseInterface{
    data: IPatient[];
}



// Patient Validation schema
export const patientRequestSchema = yup.object({
  id: yup.number().optional(),

  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  status: yup
    .mixed<StatusType>()
    .oneOf(['active', 'deactive'], 'Status must be active or deactive')
    .default('active'),

  gender: yup
    .mixed<GenderType>()
    .oneOf(['male', 'female', 'others'], 'Gender must be male, female, or others')
    .required('Gender is required'),

  contact_no: yup
    .string()
    .matches(/^\d{13}$/, 'Contact number must be 10 digits')
    .optional(),

  account_ledger_id: yup
    .number()
    .default(0),

  agent_id: yup
    .number()
    .optional(),

  physician_id: yup
    .number()
    .optional(),

    // agent: yup.object({
    //     id: yup.string().optional(),
    //     name: yup.string(),
    //     email: yup.string().optional(),
    //     contact_no: yup.string().optional(),
    //     account_ledger_id: yup.number().default(0),
    //     commission_percent: yup.number().optional(),
    //     status: yup.boolean().default(true)
    // }).optional(),

    // physician: yup.object({
    //     id: yup.string().optional(),
    //     name: yup.string(),
    //     account_ledger_id: yup.number().default(0),
    //     degree: yup.string().optional(),
    //     email: yup.string().optional(),
    //     contact_no: yup.string().optional(),
    //     discipline_id: yup.number().optional(),
    //     is_acitve: yup.boolean().default(true)
    // }).optional(),
  address: yup
    .object({
      line1: yup.string().optional(),
      line2: yup.string().optional(),
      city: yup.string().optional(),
      landmark: yup.string().optional(),
      stateId: yup.number().optional(),
      postalCode: yup.string().optional(),
      isPrimary: yup.boolean().optional(),
    })
    .optional(),
});