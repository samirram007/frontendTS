import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';




export const vehicleSchema = z.object({

  id: z.number().int().positive().optional(),
  name: z
    .string()
    .min(1, { message: 'Name is required.' }),
  code: z
    .string()
    .min(1, { message: 'Role is required.' }),
  placeType: z.string().nullish(),
  isActive: z.boolean().optional(),
  status: ActiveInactiveStatusSchema.optional(),
})
export type Vehicle = z.infer<typeof vehicleSchema>
export const vehicleListSchema = z.array(vehicleSchema)
export type VehicleList = z.infer<typeof vehicleListSchema>

export const formSchema = vehicleSchema
  .extend({
    isEdit: z.boolean(),
  })

export type VehicleForm = z.infer<typeof formSchema>


export type PlaceType = 'source' | 'destination' | 'transit' | 'pickup' | 'drop';


