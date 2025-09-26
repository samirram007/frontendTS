import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { TrueFalseSchema } from '@/types/true-false';
import { z } from 'zod';


export const stockUnitSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1).optional(),
  description: z.string().optional(),
  status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),
  icon: z.string().optional(),
  unitType: z.string().min(1),
  quantityType: z.string().min(1),
  uniqueQuantityCodeId: z.number().int().positive().optional().nullish(),
  primaryStockUnitId: z.number().int().positive().optional().nullish(),
  secondaryStockUnitId: z.number().int().positive().optional().nullish(),
  conversionFactor: z.coerce.number().min(0).optional().nullable(),
  noOfDecimalPlaces: z.number().min(0).optional().nullish()
})

export type StockUnit = z.infer<typeof stockUnitSchema>

export const stockUnitListSchema = z.array(stockUnitSchema)
export type StockUnitList = z.infer<typeof stockUnitListSchema>


export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }).optional(),
  status: z.string().min(1, { message: 'Status is required.' }),
  parentId: z.number().int().positive().optional().nullable(),
  description: z.string().min(1, { message: 'Description is required.' }),
  shouldQuantitiesOfItemsBeAdded: TrueFalseSchema.optional(),
  icon: z.string().optional(),
  unitType: z.string().min(1),
  quantityType: z.string().min(1),
  uniqueQuantityCodeId: z.number().int().positive().optional().nullish(),
  primaryStockUnitId: z.number().int().positive().optional().nullish(),
  secondaryStockUnitId: z.number().int().positive().optional().nullish(),
  conversionFactor: z.number().min(0).optional().nullish(),
  noOfDecimalPlaces: z.number().min(0).optional().nullish(),
  isEdit: z.boolean(),
})

