import type { DeliveryNoteForm } from "./schema";

export const stockJournalGodownEntryDefaultValues = {
    id: null,
    stockJournalEntryId: null,
    godownId: undefined,
    batchNo: '',
    mfgDate: null,
    expDate: null,
    serialNo: '',
    actualQuantity: 0,
    billingQuantity: 0,
    rate: 0,
    rateUnitRatio: 1,
    discountPercentage: 0,
    discount: 0,
    amount: 0,
    movementType: 'in',
    stockItem: undefined,
    stockUnit: undefined,
    remarks: undefined,
    godown: undefined
}
export const stockJournalEntryDefaultValues = {

    id: null,
    stockJournalId: undefined,
    stockItemId: undefined,
    stockItem: undefined,
    stockUnitId: undefined,
    alternateStockUnitId: undefined,
    unitRatio: 0,
    itemCost: 0,
    actualQuantity: 0,
    billingQuantity: 0,
    rate: 0,
    rateUnitId: undefined,
    rateUnitRatio: 1,
    discountPercentage: 0,
    discount: 0,
    amount: 0,
    movementType: 'in',
    stockUnit: undefined,
    rateUnit: undefined,
    godown: undefined,
    alternateStockUnit: undefined,
    stockJournalGodownEntries: []

}
export const stockJournalDefaultValues = {


    id: undefined,
    journalNo: "",
    journalDate: null,
    voucherId: undefined,
    type: "in",
    remarks: "",
    stockJournalEntries: [],

    // stockJournalEntryDefaultValues


}

const deliveryNoteDefaultValues: DeliveryNoteForm = {
    voucherNo: "new",
    voucherDate: new Date(),
    referenceNo: "",
    referenceDate: null,
    voucherTypeId: 2001,
    partyLedger: undefined,
    transactionLedger: undefined,
    stockJournalId: null,
    remarks: "",
    stockJournal: stockJournalDefaultValues,
    party: {
        id: 2,
        name: "SAM",
    },
    voucherEntries: [],
    isEdit: false,
}
export default deliveryNoteDefaultValues;

