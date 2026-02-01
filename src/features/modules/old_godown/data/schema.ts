import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';
import { addressSchema } from '../../address/data/schema';


export const storageUnitSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().nullish(),
  status: ActiveInactiveStatusSchema,
  storageUnitType: z.string().min(1).optional().nullish(),
  storageUnitCategory: z.string().min(1).optional().nullish(),
  address: z.lazy(() => addressSchema).nullable().nullish(),
  ourStockWithThirdParty: z.boolean(),
  thirdPartyStockWithUs: z.boolean(),
  isVirtual: z.boolean().default(false),
  isMobile: z.boolean().default(false),
  capacityValue: z.number().positive().default(0),
  capacityUnitId: z.number().positive().default(0),
  temperatureMin: z.number().default(0),
  temperatureMax: z.number().default(0),
  parentId: z.number().default(1)
});

export type StorageUnit = z.infer<typeof storageUnitSchema>
export const storageUnitListSchema = z.array(storageUnitSchema)
export type StorageUnitList = z.infer<typeof storageUnitListSchema>



export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' }),

  code: z
    .string()
    .min(1, { message: 'Code is required.' }),

  description: z.string().nullish(),

  status: z
    .string()
    .min(1, { message: 'Status is required.' }),

  storageUnitType: z.string().optional().nullish(),

  storageUnitCategory: z.string().optional().nullish(),

  address: z.lazy(() => addressSchema).nullable().nullish(),

  ourStockWithThirdParty: z.boolean(),

  thirdPartyStockWithUs: z.boolean(),

  isVirtual: z.boolean().default(false),

  isMobile: z.boolean().default(false),

  capacityValue: z
    .number()
    .nonnegative({ message: 'Capacity must be 0 or greater.' }),

  capacityUnitId: z
    .number()
    .positive({ message: 'Capacity unit is required.' }),

  temperatureMin: z.number(),

  temperatureMax: z.number(),
  parentId: z.coerce.number().optional(),

  isEdit: z.boolean()
})
  .refine(
    (data) => data.temperatureMin <= data.temperatureMax,
    {
      message: 'Minimum temperature cannot be greater than maximum temperature.',
      path: ['temperatureMax']
    }
  )

export type StorageUnitForm = z.infer<typeof formSchema>