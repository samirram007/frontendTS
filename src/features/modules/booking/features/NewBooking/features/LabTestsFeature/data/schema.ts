import type { IResponseInterface } from "@/features/modules/booking/data/schema";

export interface ILabTestItem{
    id: number,
    name: string,
    code: string,
    printName: string,
    sku: string,
    articleNo: string,
    partNo: null,
    description: string,
    stockCategoryId: number,
    stockGroupId: null,
    stockUnitId: number,
    alternativeStockUnitId: null,
    alternateUnitRatio: null,
    invoiceStockUnitId: null,
    invoiceConversionFactor: null,
    noOfDecimalPlaces: null,
    uqcId: null,
    typeOfSupply:string,
    isNegativeSalesAllow: boolean,
    isMaintainBatch: boolean,
    isMaintainSerial: boolean,
    isExpiryItem: boolean,
    isFinishGoods: boolean,
    isRawMaterial: boolean,
    isUnfinishedGoods: boolean,
    costingMethod: string,
    pricingMethod: string,
    reorderLevel: string,
    minimumStock: string,
    maximumStock: string,
    hasBom: null,
    isSalesAsNewManufacture: boolean,
    isPurchaseAsConsumed: boolean,
    isRejectionAsScrap: boolean,
    isGstApplicable: boolean,
    rateOfDuty: string,
    hsnSacCode: string,
    isGstInclusive: boolean,
    gstType: string,
    brandId: null,
    mrp: string,
    standardCost: null,
    icon: string,
    status: string,
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
    status: string,
}