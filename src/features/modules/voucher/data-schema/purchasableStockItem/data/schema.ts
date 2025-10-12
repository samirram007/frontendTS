import { z } from 'zod';




export const purchaseLedgerSchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1).nullish(),
  accountGroupId: z.number().int().nullish(),
  accountBalance: z.coerce.number().nullish(),
})

export type PurchaseLedgerForm = z.infer<typeof purchaseLedgerSchema>



export type PurchaseLedger = z.infer<typeof purchaseLedgerSchema>
export const purchaseLedgerListSchema = z.array(purchaseLedgerSchema)
export type PurchaseLedgerList = z.infer<typeof purchaseLedgerListSchema>

