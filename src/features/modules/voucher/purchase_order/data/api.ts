import { getData, postData, putData } from "@/utils/dataClient"

// const API_PATH="/purchase"
const API_PATH="/vouchers"


export async function fetchPurchaseOrderService(){
    return await getData(API_PATH)
}

export async function fetchPurchaseOrderByIdService(id:number){
    return await getData(`${API_PATH}/${id}`)
}

export async function storePurchaseOrderService(payload: any) {  
    return await postData(API_PATH, payload)
}

export async function updatePurchaseOrderService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}

export async function fetchPurchaseLedgersService() {
    return await getData('purchase_ledgers')
}

export async function fetchLedgerBalanceService(id: number) {
    return await getData(`ledger_balance/${id}`)
}