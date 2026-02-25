import { voucherTypeSchema } from '@/features/modules/voucher_type/data/schema'
import { z } from 'zod'
import { voucherSchema } from '../../data-schema/voucher-schema'
import { companySchema } from '@/features/modules/company/data/schema'
import { fiscalYearSchema } from '@/features/modules/fiscal_year/data/schema'

export const orderBookSchema = voucherSchema.extend({
  voucherType: voucherTypeSchema,
  company: companySchema.nullish(),
  fiscalYear: fiscalYearSchema.nullish(),
})

export type OrderbookSchema = z.infer<typeof orderBookSchema>

export const orderBookListSchema = z.array(orderBookSchema)
export type OrderbookList = z.infer<typeof orderBookListSchema>

export const formSchema = orderBookSchema
  .extend({
    isEdit: z.boolean(),
  })
  .omit({ id: true, company: true, fiscalYear: true, voucherType: true })
export type OrderbookForm = z.infer<typeof formSchema>
