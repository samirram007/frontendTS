import { godownSchema } from '@/features/modules/godown/data/schema';
import { stockItemSchema } from '@/features/modules/stock_item/data/schema';
import { stockUnitSchema } from '@/features/modules/stock_unit/data/schema';
import { z } from 'zod';




export const stockJournalsEntrySchema = z.object({
  id: z.number().int().positive().nullish(),
  stockJournalId: z.number().int().positive().nullish(),
  stockItemId: z.number().int().positive().nullish(),
  stockUnitId: z.number().int().positive().nullish(),
  alternateUnitId: z.number().int().positive().nullish(),
  unitRatio: z.number().int().positive().nullish(),
  itemCost: z.number().int().positive().nullish(),
  quantity: z.number().int().positive().nullish(),
  rate: z.number().int().positive().nullish(),
  movementType: z.string().min(1).nullish(),
  godownId: z.number().int().nullish(),
  stockItem: stockItemSchema.nullish(),
  godown: godownSchema.nullish(),
  stockUnit: stockUnitSchema.nullish(),
  alternateStockUnit: stockUnitSchema.nullish()


})

export type StockJournalsEntryForm = z.infer<typeof stockJournalsEntrySchema>


export const stockJournalSchema = z.object({
  id: z.number().int().positive().nullish(),
  journal_no: z.string().min(1).nullish(),
  journal_date: z.coerce.date().nullish(),
  voucher_id: z.number().int().nullish(),
  type: z.string().nullish(),
  remarks: z.string().nullish(),
  stockJournalEntries: z.array(stockJournalsEntrySchema)
})
export const voucherEntrySchema = z.object({
  id: z.number().int().positive().nullish(),
  voucherId: z.string().min(1).nullish(),
  entryOrder: z.number(),
  accountLedgerId: z.number().int(),
  debit: z.coerce.number().nullish(),
  credit: z.coerce.number().nullish(),
  remarks: z.string().nullish()
})
export const partySchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1).nullish(),
  accountLedgerId: z.number().int().nullish(),
  accountBalance: z.coerce.number().nullish(),
})
export const receiptNoteSchema = z.object({
  id: z.number().int().positive().nullish(),
  voucherNo: z.string().min(1).nullish(),
  voucherDate: z.coerce.date(),
  voucherTypeId: z.number().int(),
  stockJournalId: z.number().int().nullish(),
  stockJournal: stockJournalSchema.nullish(),
  voucherEntries: z.array(voucherEntrySchema),
  party: partySchema.nullish(),
  remarks: z.string().nullish()
})
export type ReceiptNote = z.infer<typeof receiptNoteSchema>
export const receiptNoteListSchema = z.array(receiptNoteSchema)
export type ReceiptNoteList = z.infer<typeof receiptNoteListSchema>



export const formSchema = z
  .object({
    voucherNo: z.string().min(1).nullish(),
    voucherDate: z.coerce.date(),
    voucherTypeId: z.number().int(),
    stockJournalId: z.number().int().nullish(),
    stockJournal: stockJournalSchema.nullish(),
    voucherEntries: z.array(voucherEntrySchema),
    isEdit: z.boolean(),
  })

export type ReceiptNoteForm = z.infer<typeof formSchema>