import { voucherTypeSchema } from '@/features/modules/voucher_type/data/schema';
import { z } from 'zod';
import { voucherSchema } from '../../data-schema/voucher-schema';
import { companySchema } from '@/features/modules/company/data/schema';
import { fiscalYearSchema } from '@/features/modules/fiscal_year/data/schema';


// export const dayBookSchema: z.ZodType<any> = z.object({
//   id: z.number().int().positive(),
//   voucherNo: z.string().min(1),
//   voucherDate: z.string(),
//   referenceNo: z.string().nullish(),
//   referenceDate: z.string().nullish(),
//   voucherTypeId: z.number().int(),
//   stockJournalId: z.number().int().nullish(),
//   remarks: z.string().nullish(),
//   voucherType: voucherTypeSchema,
//   amount: z.coerce.number().nullish(),
//   partyLedger: z.object({
//     id: z.number().int().positive(),
//     name: z.string().min(1),
//     code: z.string().nullish(),
//     ledgerableType: z.string().nullish(),
//     ledgerableId: z.coerce.number().int().nullish(),
//     currentBalance: z.coerce.number().nullish(),
//   }).nullish(),
//   transactionLedger: z.object({
//     id: z.number().int().positive(),
//     name: z.string().min(1),
//     code: z.string().nullish(),
//     accountGroupId: z.coerce.number().int().nullish(),
//     currentBalance: z.coerce.number().nullish(),
//   }).nullish(),
//   // status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),

// })
export const dayBookSchema = voucherSchema.extend({
  voucherType: voucherTypeSchema,
  company: companySchema.nullish(),
  fiscalYear: fiscalYearSchema.nullish(),

});

export type DayBookSchema = z.infer<typeof dayBookSchema>

export const dayBookListSchema = z.array(dayBookSchema)
export type DayBookList = z.infer<typeof dayBookListSchema>


export const formSchema = dayBookSchema.extend({
  isEdit: z.boolean(),
}).omit({ id: true, company: true, fiscalYear: true, voucherType: true });
export type DayBookForm = z.infer<typeof formSchema>