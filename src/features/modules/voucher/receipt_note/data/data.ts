
export const stockJournalGodownEntryDefaultValues = {
    id: undefined,
    stockJournalEntryId: null,
    godownId: 1,
    batchNo: '',
    mfgDate: new Date().toISOString().split('T')[0],
    expDate: new Date().toISOString().split('T')[0],
    serialNo: '',
    quantity: 1,
    rate: 0.00,
    movementType: 'in',
    stockItem: undefined,
    stockUnit: undefined,
    remarks: undefined,
    godown: undefined
}
export const stockJournalEntryDefaultValues = {

    id: undefined,
    stockJournalId: undefined,
    stockItemId: undefined,
    stockItem: undefined,
    stockUnitId: undefined,
    alternateStockUnitId: undefined,
    unitRatio: 0,
    itemCost: 0,
    quantity: 0,
    rate: 0,
    amount: 0,
    movementType: 'in',
    stockJournalGodownEntries: [
        stockJournalGodownEntryDefaultValues
    ]

}
export const stockJournalDefaultValues = {


    id: undefined,
    journalNo: "",
    journalDate: new Date().toISOString().split('T')[0],
    voucherId: undefined,
    type: "in",
    remarks: "",
    stockJournalEntries: [
        stockJournalEntryDefaultValues
    ],

}

const defaultValues = {
    voucherNo: "new",
    voucherDate: new Date(),
    referenceNo: "123456",
    referenceDate: new Date(),
    voucherTypeId: 1,
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
export default defaultValues;

