import { CostingMethodSchema } from '@/features/enums/costing_method';
import { MarketValuationMethodSchema } from '@/features/enums/market_valuation_method';
import { TypeOfSupplyEnum } from '@/features/enums/schema';
import { z } from 'zod';
import { currencySchema } from '../../currency/data/schema';
import { stockCategorySchema } from '../../stock_category/data/schema';
import { stockGroupSchema } from '../../stock_group/data/schema';
import { stockUnitSchema } from '../../stock_unit/data/schema';
import { employeeSchema } from '../../employee/data/schema';


export const testItemReportTemplateSchema = z.object({
  id: z.number().int().positive(),
  testItemId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  reportTemplateName: z.string().min(1),
  doctor: employeeSchema.nullish(),
});


export const testConfigSchema = z.object({
  testItemId: z.number().nullish(),
  doctorId: z.number().nullish(),
  reportTemplateName: z.string()
});

export type TestItemConfiguration = z.infer<typeof testConfigSchema>;

export type TestItemReportTemplate = z.infer<typeof testItemReportTemplateSchema>;
export const testItemReportTemplateListSchemas = z.array(testItemReportTemplateSchema);
export type TestItemReportListTemplate = z.infer<typeof testItemReportTemplateListSchemas>




export const testItemSchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1),
  code: z.string().min(1),
  printName: z.string().min(1),
  sku: z.string().nullish(),
  articleNo: z.string().nullish(),
  partNo: z.string().nullish(),
  status: z.string().min(1),
  description: z.string().nullish(),
  stockCategoryId: z.number().int().positive().nullish(),
  stockGroupId: z.number().int().positive().nullish(),
  stockUnitId: z.number().int().positive().nullish(),
  alternativeStockUnitId: z.number().int().positive().nullish(),
  baseUnitValue: z.coerce.number().positive().nullish(),
  alternateUnitValue: z.coerce.number().positive().nullish(),
  uniqueQuantityCodeId: z.number().int().positive().nullish(),
  typeOfSupply: TypeOfSupplyEnum.nullish(),
  isNegativeSalesAllow: z.boolean().nullish(),

  isMaintainBatch: z.boolean().nullish(),
  isMaintainSerial: z.boolean().nullish(),
  useExpiryDate: z.boolean().nullish(),
  trackManufacturingDate: z.boolean().nullish(),

  isFinishGoods: z.boolean().nullish(),
  isRawMaterial: z.boolean().nullish(),
  isUnfinishedGoods: z.boolean().nullish(),
  costingMethod: CostingMethodSchema.nullish(),
  marketValuationMethod: MarketValuationMethodSchema.nullish(),
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
  standardSellingPrice: z.coerce.number().nonnegative().nullish(),
  icon: z.string().nullish(),

  stockCategory: stockCategorySchema.nullish(),
  stockGroup: stockGroupSchema.nullish(),
  stockUnit: stockUnitSchema.nullish(),
  alternateStockUnit: stockUnitSchema.nullish(),

  currency: currencySchema.nullish(),
  isPackage: z.boolean(),
  isSampleRequired: z.boolean(),
  sampleName: z.string(),
  processDuration: z.coerce.number(),
  processType: z.enum(['inhouse','outsource']),
  testItemReportTemplates: testItemReportTemplateListSchemas.nullish()

})
export type TestItem = z.infer<typeof testItemSchema>
export const testItemListSchema = z.array(testItemSchema)
export type TestItemList = z.infer<typeof testItemListSchema>



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
  alternateStockUnitId: z.coerce.number().int().positive().nullish(),

  baseUnitValue: z.coerce.number().positive().nullish(),
  alternateUnitValue: z.coerce.number().positive().nullish(),
  uniqueQuantityCodeId: z.number().int().positive().nullish(),
  typeOfSupply: z.string().nullish(),
  isNegativeSalesAllow: z.boolean().nullish(),

  isMaintainBatch: z.boolean().nullish(),
  isMaintainSerial: z.boolean().nullish(),
  useExpiryDate: z.boolean().nullish(),
  trackManufacturingDate: z.boolean().nullish(),

  isFinishGoods: z.boolean().nullish(),
  isRawMaterial: z.boolean().nullish(),
  isUnfinishedGoods: z.boolean().nullish(),
  costingMethod: CostingMethodSchema.nullish(),
  marketValuationMethod: MarketValuationMethodSchema.nullish(),
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
  standardSellingPrice: z.coerce.number().nonnegative().nullish(),
  icon: z.string().nullish(),

  stockUnit: stockUnitSchema.nullish(),
  alternateStockUnit: stockUnitSchema.nullish(),
  isPackage: z.boolean(),
  isSampleRequired: z.boolean(),
  sampleName: z.string(),
  processDuration: z.coerce.number(),
  processType: z.enum(['inhouse','outsource']),

  isEdit: z.boolean(),

})

export type TestItemForm = z.infer<typeof formSchema>




export const testItemReportTemplateResponseSchema = z.object({
  id: z.number().int().positive(),
  testItemId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  reportTemplateName: z.string().min(1),
  doctor: employeeSchema.nullish(),
  testItem: testItemSchema.nullish(),
});

export type TestItemReportTemplateResponseSchema = z.infer<typeof testItemReportTemplateResponseSchema>;
export const testItemReportTemplateResponseSchemas = z.array(testItemReportTemplateResponseSchema);