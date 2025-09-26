import { z } from 'zod';

const accountingEffectsSchema = z.union([
  z.literal('debit'),
  z.literal('credit'),
])
export type accountingEffects = z.infer<typeof accountingEffectsSchema>

const voucherCategoryStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),])
export type voucherCategoryStatus = z.infer<typeof voucherCategoryStatusSchema>


export const voucherCategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  status: voucherCategoryStatusSchema,
  moduleLink: z.string().min(1).optional().nullish(),

})
export type VoucherCategory = z.infer<typeof voucherCategorySchema>
export const voucherCategoryListSchema = z.array(voucherCategorySchema)
export type VoucherCategoryList = z.infer<typeof voucherCategoryListSchema>
