import { z } from 'zod'
import { voucherSchema } from '../../data-schema/voucher-schema'

export const transferVoucherSchema = voucherSchema.extend({})
export type TransferVoucherSchema = z.infer<typeof transferVoucherSchema>
export const transferVoucherListSchema = z.array(transferVoucherSchema)
export type TransferVoucherList = z.infer<typeof transferVoucherListSchema>

export const formSchema = transferVoucherSchema
  .extend({
    isEdit: z.boolean().optional(),
  })
  .omit({
    id: true,
  })

export type TransferVoucherForm = z.infer<typeof formSchema>
