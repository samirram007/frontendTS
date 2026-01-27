
import { z } from 'zod';
import { deliveryNoteSchema } from '../../delivery_note/data/schema';
import { companySchema } from '@/features/modules/company/data/schema';
export const freightSchema = deliveryNoteSchema.extend({
  // Add any additional fields specific to Freight if necessary
  voucherReferences: z.array(z.object({
    id: z.number().int().positive().nullish(),
    voucherId: z.number().int().positive().nullish(),
    refVoucherId: z.number().int().positive().nullish(),
  })),
  company: companySchema.nullish(),
});

export type FreightSchema = z.infer<typeof freightSchema>

export const freightListSchema = z.array(freightSchema)
export type FreightListSchema = z.infer<typeof freightListSchema>


export const formSchema = z.object({
  deliveryNoteId: z.number().int().positive().nullish(),
  transporter: z.string().min(1),
  vehicleType: z.string().min(1),
  vehicleNumber: z.string().min(1),
  source: z.string().min(1),
  destination: z.string().min(1),
  quantity: z.coerce.number().int().positive().nullish(),
  weight: z.coerce.number().nullish(),
  weightUnitId: z.number().int().positive().nullish(),
  volume: z.coerce.number().nullish(),
  volumeUnitId: z.number().int().positive().nullish(),
  distance: z.coerce.number().nullish(),
  distanceUnitId: z.number().int().positive().nullish(),
  freightBasis: z.string().min(1),
  rate: z.coerce.number().min(0),
  rateUnitId: z.number().int().positive(),
  freightCharges: z.coerce.number().min(0),
  totalFare: z.coerce.number().min(0),
  dispatchSourceId: z.number().int().positive().nullish(),
  isEdit: z.boolean(),
})
export type FreightForm = z.infer<typeof formSchema>