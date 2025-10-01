import { z } from 'zod';
import { currencySchema } from '../../currency/data/schema';
import { stockCategorySchema } from '../../stock_category/data/schema';
import { stockGroupSchema } from '../../stock_group/data/schema';
import { stockUnitSchema } from '../../stock_unit/data/schema';




export const stockItemSchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1),
  code: z.string().min(1),
  printName: z.string().min(1),
  sku: z.string().optional(),
  articleNo: z.string().nullish(),
  partNo: z.string().nullish(),
  status: z.string().min(1),
  description: z.string().optional(),
  stockCategoryId: z.number().int().positive().nullish(),
  stockGroupId: z.number().int().positive().nullish(),
  stockUnitId: z.number().int().positive().nullish(),
  alternativeStockUnitId: z.number().int().positive().nullish(),
  alternateUnitRatio: z.number().positive().nullish(),
  invoiceStockUnitId: z.number().int().positive().nullish(),
  invoiceConversionFactor: z.number().positive().nullish(),
  noOfDecimalPlaces: z.number().int().nonnegative().nullish(),
  uqcId: z.number().int().positive().nullish(),
  typeOfSupply: z.enum(['goods', 'services', 'capital_goods']).nullish(),
  isNegativeSalesAllow: z.boolean().nullish(),
  isMaintainBatch: z.boolean().nullish(),
  isMaintainSerial: z.boolean().nullish(),
  isExpiryItem: z.boolean().nullish(),
  isFinishGoods: z.boolean().nullish(),
  isRawMaterial: z.boolean().nullish(),
  isUnfinishedGoods: z.boolean().nullish(),
  costingMethod: z.enum(['fifo', 'lifo', 'average', 'moving_average']).nullish(),
  pricingMethod: z.enum(['mrp', 'last_purchase', 'standard_cost', 'moving_average']).nullish(),
  reorderLevel: z.coerce.number().nonnegative().nullish(),
  minimumStock: z.coerce.number().nonnegative().nullish(),
  maximumStock: z.coerce.number().nonnegative().nullish(),
  hasBom: z.boolean().nullish(),
  isSalesAsNewManufacture: z.boolean().nullish(),
  isPurchaseAsConsumed: z.boolean().nullish(),
  isRejectionAsScrap: z.boolean().nullish(),
  isGstApplicable: z.boolean().nullish(),
  rateOfDuty: z.coerce.number().nonnegative().nullish(),
  hsnSacCode: z.string().nullish(),
  isGstInclusive: z.boolean().nullish(),
  gstType: z.enum(['cgst_sgst', 'igst', 'ugst']).nullish(),
  brandId: z.number().int().positive().nullish(),
  mrp: z.coerce.number().nonnegative().nullish(),
  standardCost: z.coerce.number().nonnegative().nullish(),
  icon: z.string().nullish(),

  stockCategory: stockCategorySchema.nullish(),
  stockGroup: stockGroupSchema.nullish(),
  stockUnit: stockUnitSchema.nullish(),
  alternativeStockUnit: stockUnitSchema.nullish(),
  invoiceStockUnit: stockUnitSchema.nullish(),
  currency: currencySchema.nullish(),

})
export type StockItem = z.infer<typeof stockItemSchema>
export const stockItemListSchema = z.array(stockItemSchema)
export type StockItemList = z.infer<typeof stockItemListSchema>



export const formSchema = z.object({

  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Role is required.' }),
  printName: z.string().min(1),
  sku: z.string().nullish(),
  articleNo: z.string().nullish(),
  partNo: z.string().nullish(),
  status: z.string().min(1, { message: 'Status is required.' }),
  description: z.string().nullish(),
  stockCategoryId: z.number().int().positive().nullish(),
  stockGroupId: z.number().int().positive().nullish(),
  stockUnitId: z.number().int().positive().nullish(),
  alternateStockUnitId: z.number().int().positive().nullish(),
  alternateUnitRatio: z.number().positive().nullish(),
  baseUnitValue: z.number().positive().nullish(),
  alternateUnitValue: z.number().positive().nullish(),
  uqcId: z.number().int().positive().nullish(),
  typeOfSupply: z.enum(['goods', 'services', 'capital_goods']).nullish(),
  isNegativeSalesAllow: z.boolean().nullish(),
  isMaintainBatch: z.boolean().nullish(),
  isMaintainSerial: z.boolean().nullish(),
  isExpiryItem: z.boolean().nullish(),
  isFinishGoods: z.boolean().nullish(),
  isRawMaterial: z.boolean().nullish(),
  isUnfinishedGoods: z.boolean().nullish(),
  costingMethod: z.enum(['fifo', 'lifo', 'average', 'moving_average']).nullish(),
  pricingMethod: z.enum(['mrp', 'last_purchase', 'standard_cost', 'moving_average']).nullish(),
  reorderLevel: z.number().nonnegative().nullish(),
  minimumStock: z.number().nonnegative().nullish(),
  maximumStock: z.number().nonnegative().nullish(),
  hasBom: z.boolean().nullish(),
  isSalesAsNewManufacture: z.boolean().nullish(),
  isPurchaseAsConsumed: z.boolean().nullish(),
  isRejectionAsScrap: z.boolean().nullish(),
  isGstApplicable: z.boolean().nullish(),
  rateOfDuty: z.number().nonnegative().nullish(),
  hsnSacCode: z.string().nullish(),
  isGstInclusive: z.boolean().nullish(),
  gstType: z.enum(['cgst_sgst', 'igst', 'ugst']).nullish(),
  brandId: z.number().int().positive().nullish(),
  mrp: z.number().nonnegative().nullish(),
  standardCost: z.number().nonnegative().nullish(),
  icon: z.string().nullish(),



  isEdit: z.boolean(),

})

export type StockItemForm = z.infer<typeof formSchema>