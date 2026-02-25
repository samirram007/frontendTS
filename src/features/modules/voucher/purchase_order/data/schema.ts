
import { z } from 'zod';
import { voucherSchema } from '../../data-schema/voucher-schema';


export const purchaseOrderSchema = voucherSchema.extend({
})
export type PurchaseOrderSchema = z.infer<typeof purchaseOrderSchema>
export const purchaseOrderListSchema = z.array(purchaseOrderSchema)
export type PurchaseOrderList = z.infer<typeof purchaseOrderListSchema>



export const formSchema = purchaseOrderSchema.extend({ 
    isEdit: z.boolean(),
}).omit({
  id: true,
  })

export type PurchaseOrderForm = z.infer<typeof formSchema>