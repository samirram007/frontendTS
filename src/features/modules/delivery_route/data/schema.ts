import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';
import { deliveryPlaceSchema } from '../../delivery_place/data/schema';




export const deliveryRouteSchema = z.object({

  id: z.number().int().positive().optional(),
  sourcePlaceId: z.number().int().positive(),
  destinationPlaceId: z.number().int().positive(),
  distanceKm: z.coerce.number().min(0).optional(),
  estimatedTimeInMinutes: z.coerce.number().min(0).optional(),
  sourcePlace: deliveryPlaceSchema.nullish(),
  destinationPlace: deliveryPlaceSchema.nullish(),
  rate: z.coerce.number().min(0).optional(),
})
export type DeliveryRoute = z.infer<typeof deliveryRouteSchema>
export const deliveryRouteListSchema = z.array(deliveryRouteSchema)
export type DeliveryRouteList = z.infer<typeof deliveryRouteListSchema>

export const formSchema = deliveryRouteSchema
  .extend({
    isEdit: z.boolean(),
  })

export type DeliveryRouteForm = z.infer<typeof formSchema>


export type PlaceType = 'source' | 'destination' | 'transit' | 'pickup' | 'drop';


