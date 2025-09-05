import { z } from 'zod';

const accountingEffectsSchema = z.union([
  z.literal('debit'),
  z.literal('credit'),
])
export type accountingEffects = z.infer<typeof accountingEffectsSchema>

const accountNatureStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),])
export type accountNatureStatus = z.infer<typeof accountNatureStatusSchema>


export const accountNatureSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  status: accountNatureStatusSchema,
  accountingEffect: accountingEffectsSchema.optional(),

})
export type AccountNature = z.infer<typeof accountNatureSchema>
export const accountNatureListSchema = z.array(accountNatureSchema)
export type AccountNatureList = z.infer<typeof accountNatureListSchema>
