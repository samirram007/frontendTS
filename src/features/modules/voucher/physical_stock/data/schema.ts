
import { z } from 'zod';
import { voucherSchema } from '../../data-schema/voucher-schema';


export const physicalStockSchema = voucherSchema.extend({
})
export type PhysicalStockSchema = z.infer<typeof physicalStockSchema>
export const physicalStockListSchema = z.array(physicalStockSchema)
export type PhysicalStockList = z.infer<typeof physicalStockListSchema>



export const formSchema = physicalStockSchema.extend({
  isEdit: z.boolean(),
}).omit({
  id: true,
})

export type PhysicalStockForm = z.infer<typeof formSchema>