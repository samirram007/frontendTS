import { z } from 'zod'
import { companyTypeSchema } from '../../company_type/data/schema'
import { countrySchema } from '../../country/data/schema'
import { currencySchema } from '../../currency/data/schema'
import { stateSchema } from '../../state/data/schema'

export const companySchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1),
  mailingName: z.string().min(1),
  code: z.string().min(1),
  address: z.string().nullish(),
  phoneNo: z.string().nullish(),
  mobileNo: z.string().nullish(),
  email: z.string().nullish(),
  website: z.string().nullish(),
  cinNo: z.string().nullish(),
  tinNo: z.string().nullish(),
  tanNo: z.string().nullish(),
  gstNo: z.string().nullish(),
  panNo: z.string().nullish(),
  city: z.string().nullish(),
  countryId: z.number().int().positive().nullish(),
  stateId: z.number().int().positive().nullish(),
  currencyId: z.number().int().positive().nullish(),
  companyTypeId: z.number().int(),
  country: countrySchema.nullish(),
  state: stateSchema.nullish(),
  currency: currencySchema.nullish(),
  companyType: companyTypeSchema.nullish(),
})
export type Company = z.infer<typeof companySchema>
export const companyListSchema = z.array(companySchema)
export type CompanyList = z.infer<typeof companyListSchema>

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }),
  mailingName: z.string().min(1),

  status: z.string().min(1, { message: 'Status is required.' }),
  description: z.string().optional(),
  companyTypeId: z
    .number()
    .int()
    .min(1, { message: 'Company Type is required' }),
  address: z.string().nullish(),
  city: z.string().nullish(),
  zipCode: z.string().nullish(),
  phoneNo: z.string().nullish(),
  mobileNo: z.string().nullish(),
  email: z.string().nullish(),
  website: z.string().nullish(),
  cinNo: z.string().nullish(),
  tinNo: z.string().nullish(),
  tanNo: z.string().nullish(),
  gstNo: z.string().nullish(),
  panNo: z.string().nullish(),

  countryId: z.number().int().positive().nullish(),
  stateId: z.number().int().positive().nullish(),
  currencyId: z.number().int().positive().nullish(),
  isEdit: z.boolean(),
})

export type CompanyForm = z.infer<typeof formSchema>
