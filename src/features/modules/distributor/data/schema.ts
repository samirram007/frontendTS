import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';




export const godownSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  status: ActiveInactiveStatusSchema,
  parentId: z.number().int().positive().optional().nullish(),
  parent: z.lazy(() => godownSchema).optional().nullish(),
  address: z
    .object({
      street: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      state: z.string().nullable().optional(),
      pincode: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  ourStockWithThirdParty: z.boolean(),
  thirdPartyStockWithUs: z.boolean()

})
export type Godown = z.infer<typeof godownSchema>
export const godownListSchema = z.array(godownSchema)
export type GodownList = z.infer<typeof godownListSchema>



export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' }),
    code: z
      .string()
      .min(1, { message: 'Role is required.' }),
    status: z
      .string()
      .min(1, { message: 'Status is required.' }),
    parentId: z.number().int().positive().optional().nullish(),
    description: z.string().min(1, { message: 'Description is required.' }),
    address: z
      .object({
        street: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        pincode: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    ourStockWithThirdParty: z.boolean(),
    thirdPartyStockWithUs: z.boolean(),
    isEdit: z.boolean(),
  })

export type GodownForm = z.infer<typeof formSchema>