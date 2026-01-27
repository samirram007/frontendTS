import { stockJournalDefaultValues } from "../../data-schema/data";
import type { VoucherDispatchDetailForm } from "../../data-schema/voucher-schema";
import type { PhysicalStockForm } from "./schema";


export const partyDefaultValues = {
    name: "",
    mailingName: "",
    line1: "",
    line2: "",
    line3: "",
    stateId: 36,
    countryId: 76,
    gstRegistrationTypeId: 1,
    gstin: "",
    placeOfSupplyStateId: 36,
}
export const voucherDispatchDefaultValues: VoucherDispatchDetailForm = {
    id: null,
    voucherId: null,
    orderNumber: null,
    paymentTerms: null,
    otherReferences: null,
    termsOfDelivery: null,
    receiptDocNo: null,
    dispatchedThrough: null,
    destination: null,
    carrierName: null,
    billOfLadingNo: null,
    billOfLadingDate: null,
    motorVehicleNo: null,
}



const physicalStockDefaultValues: PhysicalStockForm = {
    voucherNo: "new",
    voucherDate: new Date(),
    referenceNo: "",
    referenceDate: null,
    voucherTypeId: 2007,
    isEffecting: true,
    effectsAccount: false,
    effectsStock: true,
    partyLedger: undefined,
    transactionLedger: undefined,
    stockJournalId: null,
    remarks: "",
    stockJournal: stockJournalDefaultValues,
    party: undefined,
    voucherDispatchDetail: undefined,
    voucherEntries: [],
    isEdit: false,
}
export default physicalStockDefaultValues;

