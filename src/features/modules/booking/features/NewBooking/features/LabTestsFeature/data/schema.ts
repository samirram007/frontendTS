import type { IResponseInterface } from "@/features/modules/booking/data/schema";

export interface ILabTestItem {
  id: number;
  name: string;
  code: string;
  printName: string;
  sku: string;
  articleNo: unknown | null;
  partNo: unknown | null;
  description: string;
  stockCategoryId: number;
  stockGroupId: number;
  stockUnitId: number;
  alternateStockUnitId: number;
  baseUnitValue: string;
  alternateUnitValue: string;
  uniqueQuantityId: unknown | null;
  typeOfSupply: string;
  isNegativeSalesAllow: boolean;
  isMaintainBatch: boolean;
  isMaintainSerial: boolean;
  useExpiryDate: boolean;
  trackManufacturingDate: boolean;
  isFinishGoods: boolean;
  isRawMaterial: boolean;
  isUnfinishedGoods: boolean;
  costingMethod: string;
  marketValuationMethod: string;
  reorderLevel: number;
  minimumStock: string;
  maximumStock: string;
  hasBom: boolean;
  isSalesAsNewManufacture: boolean;
  isPurchaseAsConsumed: boolean;
  isRejectionAsScrap: boolean;
  isGstApplicable: boolean;
  rateOfDuty: string;
  hsnSacCode: string;
  isGstInclusive: boolean;
  gstType: string;
  brandId: unknown | null;
  mrp: string;
  standardCost: string;
  standardSellingPrice: string;
  icon: unknown | null;
  status: string;
  stockUnit: {
    id: number;
    name: string;
    code: string;
    description: string;
    status: string;
    unitType: string;
    quantityType: string;
    icon: string;
    uniqueQuantityCodeId: number;
    primaryStockUnitId: unknown | null;
    secondaryStockUnitId: unknown | null;
    conversionFactor: unknown | null;
    noOfDecimalPlaces: number;
  };
  alternateStockUnit: {
    id: number;
    name: string;
    code: string;
    description: string;
    status: string;
    unitType: string;
    quantityType: string;
    icon: string;
    uniqueQuantityCodeId: number;
    primaryStockUnitId: unknown | null;
    secondaryStockUnitId: unknown | null;
    conversionFactor: string;
    noOfDecimalPlaces: number;
  };
}



export interface ILabTestListItemResponse extends IResponseInterface{
    data: ILabTestItem[]
}



export interface ITestItem{
    id?: number,
    testId: number,
    name: string,
    testDate: Date,
    reportDate: Date,
    amount: string,
    status?: string,
}

