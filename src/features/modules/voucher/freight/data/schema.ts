import { voucherTypeSchema } from '@/features/modules/voucher_type/data/schema';
import { z } from 'zod';
import { deliveryNoteSchema } from '../../delivery_note/data/schema';
import { companySchema } from '@/features/modules/company/data/schema';
export const freightSchema = deliveryNoteSchema.extend({
  // Add any additional fields specific to Freight if necessary
  voucherReferences: z.array(z.object({
    id: z.number().int().positive().nullish(),
    voucherId: z.number().int().positive().nullish(),
    refVoucherId: z.number().int().positive().nullish(),
  })),
  company: companySchema.nullish(),
});

export type FreightSchema = z.infer<typeof freightSchema>

export const freightListSchema = z.array(freightSchema)
export type FreightListSchema = z.infer<typeof freightListSchema>

export const stockSummarySchema: z.ZodType<any> = z.object({
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

export type StockSummarySchema = z.infer<typeof stockSummarySchema>

export const stockSummaryListSchema = z.array(stockSummarySchema)
export type StockSummaryList = z.infer<typeof stockSummaryListSchema>


export const formSchema = z.object({
  deliveryNoteId: z.number().int().positive().nullish(),
  distance: z.coerce.number().min(0),
  distanceUnitId: z.number().int().positive(),
  rateUnitId: z.number().int().positive(),
  rate: z.coerce.number().min(0),
  freightCharges: z.coerce.number().min(0),
  totalFare: z.coerce.number().min(0),
  isEdit: z.boolean(),
})
export type FreightForm = z.infer<typeof formSchema>