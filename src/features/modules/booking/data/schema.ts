import {z} from 'zod';



export interface AgentInterface{
  id?:number,
  name:string,
  contact:string,
  comission:number,
}
export interface PhysicianInterface{
  id?:number,
  name:string,
  contact:string,
  degree:string,
  discipline?:string
}


export interface IPatientSchema{
  id?:number
  name: string
  phone: string
  gender: string
  age: string
  dob: string
  agentId:number
  physicianId:number
  agent: AgentInterface,
  physician:PhysicianInterface
}



export interface IDiscountSchema{
  id:number,
  name:string,
  discount_type:string,
  value:number
}


export interface ITestSchema{
  test_id:string,
  test_name:string,
  category:string,
  price:number,
  unit:string,
  reporting_duration:number
}




// Payment Enum

export interface ITestItem{
    id:number,
    test_id:string,
    test_name:string,
    category:string,
    price:number,
    unit:string,
    test_date:Date,
    reporting_date:Date,
    payment_status:boolean,
    specimen_status:boolean,
    report_duration:number
}


export type DiscountType = "percentage" | "flat";



// schema used in this project

// agent list schema
export const agentSchema = z.object({
  id: z.number().int().positive().optional().default(0),
  name: z.string().default("Agent name"),
  email: z.string().email().optional(),
  contact_no: z.string().optional(),
  commission_percent: z.string().default("0.00").optional(),
});

export type Agent = z.infer<typeof agentSchema>;

export const agentListSchema = z.array(agentSchema);
export type AgentList = z.infer<typeof agentListSchema>;

// Instead of mismatched interface, derive it directly:
export type IAgentInterface = Agent;


// physician list schema
export const physicianSchema = z.object({
  id: z.number().int().positive().optional().default(0),
  name: z.string().default("Physician name"),
  contact_no: z.string().optional(),
  email: z.string().email().optional(),
  degree: z.string().default("M.B.B.S"),
  discipline_id: z.number().optional(),
  is_active: z.boolean().optional(),
});

export type PhysicianSchema = z.infer<typeof physicianSchema>;

export const physicianListSchema = z.array(physicianSchema);
export type PhysicianList = z.infer<typeof physicianListSchema>;

// address schema

export const addressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state_id: z.number().optional(),
  postal_code: z.string().optional(),
  is_primary: z.boolean().optional(),
});

export type AddressSchema = z.infer<typeof addressSchema>;


// Patient schema
export const patientSchema = z.object({
  id: z.number().int().positive().optional().default(0),
  name: z.string().default("Patient Name"),
  contact_no: z.string().default("000-000-0000"),
  gender: z.string().default("gender"),
  agentId: z.number().int().positive().default(0),
  physicianId: z.number().int().positive().nullish(),
  address: addressSchema.nullish(),
  agent: agentSchema.nullish(),
  physician: physicianSchema.nullish(),
});

export type PatientSchema = z.infer<typeof patientSchema>;

export const patientListSchema = z.array(patientSchema);
export type PatientListSchema = z.infer<typeof patientListSchema>;



//  test schema
const testSchema = z.object({
  id: z.number().int().optional().default(0),
  name: z.string().default("Live Test"),
  stock_category: z.string().default(""),
  price: z.number().int().default(0),
  unit: z.string(),
  test_date: z.date(),
  reporting_date: z.date(),
  payment_status: z.boolean(),
  specimen_status: z.boolean(),
  report_duration: z.number()
});

export type TestSchema = z.infer<typeof testSchema>;
export const labTestsListSchema = z.array(testSchema);
export type LabTestListSchema = z.infer<typeof labTestsListSchema>;





export interface IResponseInterface{
  status: boolean;
  code: number;
  message: string;
  success: boolean;
  errors:{
    [field:string]: string[]
  };
  errorCode: string
}

