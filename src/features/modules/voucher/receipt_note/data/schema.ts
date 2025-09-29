import { z } from 'zod';



export const receiptNoteSchema = z.object({
  id: z.number().int().positive().nullish(),
  voucherNo: z.string().min(1).nullish(),
  stockJournals: z.array(z.any()).nullish(),
  voucherEntries: z.array(z.any()).nullish()

})
export type ReceiptNote = z.infer<typeof receiptNoteSchema>
export const receiptNoteListSchema = z.array(receiptNoteSchema)
export type ReceiptNoteList = z.infer<typeof receiptNoteListSchema>



export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' }),
    code: z
      .string()
      .min(1, { message: 'Role is required.' }),
    mailingName: z.string().min(1),

    status: z
      .string()
      .min(1, { message: 'Status is required.' }),
    description: z.string().optional(),
    companyTypeId: z
      .number().int()
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