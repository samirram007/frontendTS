import { z } from 'zod';




export const addressSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive().nullish(),
  line1: z.string().nullable().optional(),
  line2: z.string().nullable().optional(),
  landmark: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  latitude: z.string().nullable().optional(),
  longitude: z.string().nullable().optional(),
  addressType: z.string().nullable().optional(),
  isPrimary: z.coerce.boolean().nullable().optional(),
  addressable: z.object({
    addressableId: z.number().nullish(),
    addressableType: z.number().nullish(),
  })
})
export type Address = z.infer<typeof addressSchema>
export const addressListSchema = z.array(addressSchema)
export type AddressList = z.infer<typeof addressListSchema>



export const formSchema = z
  .object({
    line1: z.string().nullable().optional(),
    line2: z.string().nullable().optional(),
    landmark: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    latitude: z.string().nullable().optional(),
    longitude: z.string().nullable().optional(),
    addressType: z.string().nullable().optional(),
    isPrimary: z.coerce.boolean().nullable().optional(),
    addressable: z.object({
      addressableId: z.number().nullish(),
      addressableType: z.number().nullish(),
    }),
    isEdit: z.boolean(),
  })

export type AddressForm = z.infer<typeof formSchema>