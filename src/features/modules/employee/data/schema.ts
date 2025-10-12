import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';
import { accountLedgerSchema } from '../../account_ledger/data/schema';
import { addressSchema } from '../../address/data/schema';
import { departmentSchema } from '../../department/data/schema';
import { designationSchema } from '../../designation/data/schema';




export const employeeSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().nullish(),
  dob: z.date().nullish(),
  doj: z.date().nullish(),
  email: z.string().nullish(),
  contactNo: z.string().nullish(),
  pan: z.string().nullish(),
  image: z.string().nullish(),
  education: z.string().nullish(),
  status: ActiveInactiveStatusSchema,
  departmentId: z.coerce.number().nullish(),
  department: z.lazy(() => departmentSchema).optional().nullish(),
  designationId: z.coerce.number().nullish(),
  designation: z.lazy(() => designationSchema).optional().nullish(),
  accountLedger: z.lazy(() => accountLedgerSchema).optional().nullish(),
  address: z.lazy(() => addressSchema).nullable().nullish(),

})
export type Employee = z.infer<typeof employeeSchema>
export const employeeListSchema = z.array(employeeSchema)
export type EmployeeList = z.infer<typeof employeeListSchema>



export const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    code: z.string(),
    status: z.string().min(1, { message: 'Status is required.' }),
    dob: z.coerce.date().nullish(),
    doj: z.coerce.date().nullish(),
    email: z.string().nullish(),
    contactNo: z.string().nullish(),
    pan: z.string().nullish(),
    image: z.string().nullish(),
    education: z.string().nullish(),
    departmentId: z.coerce.number().nullish(),
    department: z.lazy(() => departmentSchema).optional().nullish(),
    designationId: z.coerce.number().nullish(),
    designation: z.lazy(() => designationSchema).optional().nullish(),
    accountLedger: z.lazy(() => accountLedgerSchema).optional().nullish(),
    address: z.lazy(() => addressSchema).nullable().nullish(),
    accountGroupId: z.coerce.number().nullish(), 

    isEdit: z.boolean(),
  })

export type EmployeeForm = z.infer<typeof formSchema>