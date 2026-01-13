import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status'
import z from 'zod'
import { addressSchema } from '../../address/data/schema'

export const patientSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  patientId: z.string().nullish(),
  name: z.string().min(1),
  email: z.string().nullish(),
  dob: z.coerce.date().nullish(),
  gender: z.enum(['male', 'female', 'other']).nullish(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .nullish(),
  contactNo: z.string().nullish(),
  image: z.string().nullish(),
  status: ActiveInactiveStatusSchema,
  address: z
    .lazy(() => addressSchema)
    .nullable()
    .nullish(),
})

export type Patient = z.infer<typeof patientSchema>
export const patientListSchema = z.array(patientSchema)
export type PatientList = z.infer<typeof patientListSchema>

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().nullish(),
  dob: z.coerce.date().nullish(),
  gender: z.enum(['male', 'female', 'other']).nullish(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .nullish(),
  contactNo: z.string().nullish(),
  image: z.string().nullish(),
  status: z.string().min(1, { message: 'Status is required.' }),
  address: z
    .lazy(() => addressSchema)
    .nullable()
    .nullish(),
})
export type PatientForm = z.infer<typeof formSchema>
