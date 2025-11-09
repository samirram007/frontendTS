import type { IResponseInterface } from "../../../data/schema";
import type { ITestItem } from "../features/LabTestsFeature/data/schema";
import type { AddressType, IPatient } from "../features/CreatePatientFeature/data/schema";
import type { IVoucher } from "../../BookingList/data/schema";
import {z} from "zod";


type MovementType = "in" | "out";
type StatusType = "active" | "inactive"

export interface IJobOrder {
  id: number;
  patientId: number;
  voucherId: number;
  status: 'sample_collected' | 'pending' | 'completed' | 'cancelled' | string; // you can narrow down further if needed
  paymentStatus: 'paid' | 'partial' | 'unpaid' | string;
  bookedDate: string | null;
  expectedDeliveryDate: string | null;
  report_generated_date: string | null;
  report_delivered_date: string | null;
  cancelled_date: string | null;
  report_file_path: string | null;
  remarks: string | null;
}


//  Stock Journal
export interface IStockJournal{
    id: number,
    journalNo: string,
    journalDate: string,
    type: MovementType,
    remarks: unknown | null,
    stockJournalEntries: IStockJournalEntry[],
}

// Stock Journal Entry
export interface IStockJournalEntry{
    id: number,
    stockJournalId: number,
    stockItemId: number,
    stockUnitId: number,
    alternateUnitId: number,
    testDate: Date,
    reportDate: Date,
    unitRatio: string,
    itemCost: string,
    rate: string,
    movementType: MovementType,
    godownId: unknown | null,
    stockItem: IStockItem,
    stockUnit: IStockUnit,
    jobOrder:IJobOrder | null
}


export interface IStockCategory{
    id: number,
    name: string,
    code: string,
    status: string,
    description: string,
    parentId: number | null
}

export interface IStockGroup{
    id: number,
    name: string,
    code: string,
    status: string,
    description: string,
    shouldQuantitiesOfItemsBeAdded: boolean,
    parentId: number
}

// Stock Item
export interface IStockItem{
    id: number,
    name: string,
    code: string,
    printName: string,
    sku: string,
    articleNo: unknown | null,
    partNo: unknown | null,
    description: string,
    stockCategoryId: number,
    stockGroupId: number,
    stockUnitId: number,
    alternateStockUnitId: number,
    baseUnitValue: string,
    alternateUnitValue: string,
    uniqueQuantityId: unknown | null,
    typeOfSupply: string,
    isNegativeSalesAllow: boolean,
    isMaintainBatch: boolean,
    isMaintainSerial: boolean,
    useExpiryDate: boolean,
    trackManufacturingDate: boolean,
    isFinishGoods: boolean,
    isRawMaterial: boolean,
    isUnfinishedGoods: boolean,
    costingMethod: string,
    marketValuationMethod: string,
    reorderLevel: number,
    minimumStock: string,
    maximumStock: string,
    hasBom: boolean,
    isSalesAsNewManufacture: boolean,
    isPurchaseAsConsumed: boolean,
    isRejectionAsScrap: boolean,
    isGstApplicable: true,
    rateOfDuty: string,
    hsnSacCode: unknown | null,
    isGstInclusive: boolean,
    gstType: string,
    brandId: unknown | null,
    mrp: string,
    standardCost: string,
    standardSellingPrice: string,
    icon: unknown | null,
    status: StatusType,
    isSampleRequired: boolean,
    stockCategory: IStockCategory,
    stockGroup: IStockGroup
}


export interface IStockUnit{
    id: number,
    name: string,
    code: string,
    description: string,
    status: string,
    unitType: string,
    quantityType: string,
    icon: string,
    uniqueQuantityCodeId: number,
    primaryStockUnitId: unknown | null,
    secondaryStockUnitId: unknown | null,
    conversionFactor: unknown | null,
    noOfDecimalPlaces: number
}

export interface IVoucherEntry{
    id: number,
    voucherId: number,
    entryOrder: number,
    accountLedgerId: number,
    debit: string,
    credit: string,
    remarks: unknown | null,
    accountLedger: IAccountLedger
}

export interface IAccountLedger{
    id: number,
    name: string,
    code: string,
    description: unknown | null,
    status: StatusType,
    icon: unknown | null,
    accountGroupId: number
}

export interface IVoucherReference{
    id: number,
    voucherId: number,
    voucherReferenceId: number | null,
    voucher: IVoucher,
}

export interface IVoucherPatient{
    id: number,
    voucherId: number,
    patientId: number,
    agentId: number,
    physicianId: number,
    patient: {
        id: number,
        name: string,
        age: number,
        contactNo: string,
        gender: string,
        status: string,
        agentId: number,
        physicianId: number,
        address?: AddressType
    },
    agent: {
        id: number,
        name: string,
        email: string,
        contactNo: string,
        commissionPercent: string,
    },
    physician: {
        id: number,
        name: string,
        contactNo: string,
        degree: string,
        disciplineId: number
    },
    address?: AddressType
}

  
        
            
            

// booking payload
export interface IBookingTest{
    bookingDate: Date,
    patientId: number,
    agentId?:number | null ,
    physicianId?: number | null,
    tests: ITestItem[],
    discountTypeId?: number | null,
    sampleCollectorId?:number | null,
    rate?:number
}


interface ITests{
    testName: string,
    testDate: Date,
    reportDate: Date,
    rate: string
}

export interface IBookingTestResponse extends IResponseInterface{
    data:{
        bookingId: string,
        bookingDate: Date,
        totalAmount: number,
        discountAmount: number | null,
        netAmount: number,
        voucherNo: string,
        patient: IPatient,
        tests: ITests[]
    }
}




export interface IBooking{
    id: number,
    voucherNo: string,
    voucherDate: string,
    voucherTypeId: number,
    remarks: unknown | null,
    status: StatusType,
    fiscalYearId: number,
    companyId: number,
    stockJournalId: number,
    stockJournal: IStockJournal,
    voucherEntries: IVoucherEntry[],
    voucherPatient: IVoucherPatient,
    voucherReferences?: IVoucherReference[]
}




export interface IBookingResponse extends IResponseInterface{
    data: IBooking
}



// discounts
export const discountSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    isPercentage: z.boolean(),
    value: z.number()
})


