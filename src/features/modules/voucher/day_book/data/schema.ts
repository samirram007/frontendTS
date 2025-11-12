import { voucherTypeSchema } from '@/features/modules/voucher_type/data/schema';
import { z } from 'zod';


export const dayBookSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  voucherNo: z.string().min(1),
  voucherDate: z.string(),
  referenceNo: z.string().nullish(),
  referenceDate: z.string().nullish(),
  voucherTypeId: z.number().int(),
  stockJournalId: z.number().int().nullish(),
  remarks: z.string().nullish(),
  voucherType: voucherTypeSchema,
  amount: z.coerce.number().nullish(),
  partyLedger: z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    code: z.string().nullish(),
    ledgerableType: z.string().nullish(),
    ledgerableId: z.coerce.number().int().nullish(),
    currentBalance: z.coerce.number().nullish(),
  }).nullish(),
  transactionLedger: z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    code: z.string().nullish(),
    accountGroupId: z.coerce.number().int().nullish(),
    currentBalance: z.coerce.number().nullish(),
  }).nullish(),
  // status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),

})

export type DayBookSchema = z.infer<typeof dayBookSchema>

export const dayBookListSchema = z.array(dayBookSchema)
export type DayBookList = z.infer<typeof dayBookListSchema>


export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }).nullish(),
  status: z.string().min(1, { message: 'Status is required.' }),

  description: z.string().min(1, { message: 'Description is required.' }).nullish(),

  isEdit: z.boolean(),
})