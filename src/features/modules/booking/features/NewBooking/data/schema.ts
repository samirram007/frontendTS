import type { IResponseInterface } from "../../../data/schema";
import type { ITestItem } from "../features/LabTestsFeature/data/schema";
import type { IPatient } from "../features/CreatePatientFeature/data/schema";


type MovementType = "in" | "out";
type StatusType = "active" | "inactive"


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
    unitRatio: string,
    itemCost: string,
    rate: string,
    movementType: MovementType,
    godownId: unknown | null,
    stockItem: IStockItem,
    stockUnit: IStockUnit,
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
        physicianId: number
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
    }
}

  
        
            
            

// booking payload
export interface IBookingTest{
    bookingDate: Date,
    patientId: number,
    agentId?:number,
    physicianId?: number,
    tests: ITestItem[],
    discountTypeId?: number
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
    voucherPatient: IVoucherPatient
}



export interface IBookingListResponse extends IResponseInterface{
    data: IBooking[]
}
export interface IBookingResponse extends IResponseInterface{
    data: IBooking
}



