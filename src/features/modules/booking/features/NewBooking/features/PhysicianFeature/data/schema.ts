import type { IResponseInterface } from "@/features/modules/booking/data/schema"
import * as yup from "yup";


// Physician API for form
export interface IPhysician{
    id?: number,
    name: string,
    accountLedgerId?: number,
    degree: string,
    email?: string,
    contactNo: string,
    disciplineId: number | string,
    status: boolean
}
export interface IPhysicianRequest{
    name: string,
    accountLedgerId?: number,
    degree: string,
    email?: string,
    contactNo: string,
    disciplineId: number | string,
    status: boolean
}


export interface IPhysicianResponse extends IResponseInterface{
    data: IPhysician
};

export interface IPhysicianListResponse extends IResponseInterface{
    data: IPhysician[]
}


export const physicianSchema = yup.object({
  id: yup.number().optional(),

  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),

  accountLedgerId: yup
    .number()
    .default(0)
    .optional(),

  degree: yup
    .string()
    .required("'Degree is required"),

  email: yup
    .string()
    .email('Email must be a valid email address')
    .optional(),

  contactNo: yup
    .string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact is required'),

  disciplineId: yup
    .string()
    .optional(),

  status: yup
    .boolean()
    .default(true)
    .optional()
});



// discipline Interface
export interface IDiscipline{
  id?: number,
  name: string,
  code?: string | null | undefined,
  status?: string,
  description?: string
}


export interface IDisciplineResponse extends IResponseInterface{
    data: IDiscipline
};

export interface IDisciplineListResponse extends IResponseInterface{
    data: IDiscipline[]
}
