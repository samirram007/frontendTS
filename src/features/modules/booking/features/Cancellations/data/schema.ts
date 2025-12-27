import { z } from "zod";
import type { IResponseInterface } from "../../../data/schema";


const PatientSchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string().nullable(),
    contact_no: z.string(),
    age: z.number(),
    gender: z.enum(["male", "female", "other"]),
    status: z.string(),
    agent_id: z.number().nullable(),
    physician_id: z.number().nullable(),
    discount_type_id: z.number(),
    created_by: z.number().nullable(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

const AgentSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    contact_no: z.string(),
    commission_percent: z.string(),
    is_active: z.number(),
    created_by: z.number().nullable(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

const PhysicianSchema = z.object({
    id: z.number(),
    name: z.string(),
    degree: z.string(),
    email: z.string().email(),
    contact_no: z.string(),
    discipline_id: z.number(),
    status: z.number(),
    created_by: z.number().nullable(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

/* -------------------- TESTS -------------------- */

const TestSchema = z.object({
    id: z.number(),
    stockJournalEntryId: z.number(),
    testName: z.string(),
    testDate: z.string(),
    reportDate: z.string(),
    amount: z.string(), // keeping string as per API
    status: z.string(),
    remarks: z.string().nullable(),
});

/* -------------------- VOUCHER REFERENCES -------------------- */

const VoucherRefVoucherSchema = z.object({
    id: z.number(),
    voucher_no: z.string(),
    voucher_date: z.string(),
    reference_no: z.string().nullable(),
    reference_date: z.string().nullable(),
    voucher_type_id: z.number(),
    is_effecting: z.number(),
    is_optional: z.number(),
    remarks: z.string().nullable(),
    status: z.string(),
    fiscal_year_id: z.number(),
    company_id: z.number(),
    stock_journal_id: z.number().nullable(),
    cancelled_by: z.number().nullable(),
    is_cancelled: z.number(),
    created_by: z.number(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

const VoucherReferenceSchema = z.object({
    id: z.number(),
    voucher_id: z.number(),
    voucher_reference_id: z.number(),
    created_by: z.number(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    voucher: VoucherRefVoucherSchema,
});

/* -------------------- VOUCHER PATIENT -------------------- */

const VoucherPatientSchema = z.object({
    id: z.number(),
    voucher_id: z.number(),
    patient_id: z.number(),
    agent_id: z.number(),
    physician_id: z.number(),
    discount_type_id: z.number(),
    sample_collector_id: z.number().nullable(),
    status: z.string(),
    created_by: z.number(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    patient: PatientSchema,
    agent: AgentSchema,
    physician: PhysicianSchema,
});

/* -------------------- MAIN VOUCHER -------------------- */

const VoucherSchema = z.object({
    id: z.number(),
    voucher_no: z.string(),
    voucher_date: z.string(),
    reference_no: z.string().nullable(),
    reference_date: z.string().nullable(),
    voucher_type_id: z.number(),
    is_effecting: z.number(),
    is_optional: z.number(),
    remarks: z.string().nullable(),
    status: z.string(),
    fiscal_year_id: z.number(),
    company_id: z.number(),
    stock_journal_id: z.number().nullable(),
    cancelled_by: z.number().nullable(),
    is_cancelled: z.number(),
    created_by: z.number(),
    updated_by: z.number().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    voucher_patient: VoucherPatientSchema,
    voucher_references: z.array(VoucherReferenceSchema),
});

// new schemas

export const testSchema = z.object({
    id: z.number(),
    stockJournalEntryId: z.number(),
    testName: z.string(),
    testDate: z.string(),
    reportDate: z.string(),
    amount: z.string(),
    status: z.string(),
    remarks: z.string().nullable(),
});

export const testCancellationSchema = z.object({
    bookingNo: z.string(),
    bookingDate: z.string(),
    patientId: z.number(),
    patientName: z.string(),
    patientAge: z.number(),
    patientGender: z.string(),
    patientContact: z.string(),
    agentName: z.string().nullable(),
    physicianName: z.string().nullable(),
    tests: z.array(TestSchema).nullable().optional(),
    voucher: VoucherSchema.nullable().optional(),
});



export type ITestCancellation = z.infer<typeof testCancellationSchema>;
export const testCancellationList = z.array(testCancellationSchema);
export type ITestCancellationList = z.infer<typeof testCancellationList>;



export interface ITestCancellationListResponse extends IResponseInterface {
    data: ITestCancellationList
}

export interface ITestCancellationResponse extends IResponseInterface {
    data: ITestCancellation
}