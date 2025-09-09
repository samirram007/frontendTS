import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { TrueFalseSchema } from '@/types/true-false';
import { z } from 'zod';


export const stockGroupSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1).optional(),
  description: z.string().optional(),
  status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),
  icon: z.string().optional(),
  parentId: z.number().int().positive().optional().nullish(),
  parent: z.lazy(() => stockGroupSchema).optional().nullish(),
  shouldQuantitiesOfItemsBeAdded: TrueFalseSchema.default(TrueFalseSchema.options[1].value),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type StockGroup = z.infer<typeof stockGroupSchema>

export const stockGroupListSchema = z.array(stockGroupSchema)
export type StockGroupList = z.infer<typeof stockGroupListSchema>


export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }).optional(),
  status: z.string().min(1, { message: 'Status is required.' }),
  parentId: z.number().int().positive().optional().nullable(),
  description: z.string().min(1, { message: 'Description is required.' }),
  shouldQuantitiesOfItemsBeAdded: TrueFalseSchema.optional(),
  icon: z.string().optional(),
  isEdit: z.boolean(),
})