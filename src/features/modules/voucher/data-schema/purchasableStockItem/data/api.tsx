import { getData } from "@/utils/dataClient"

const API_PATH = "/purchase_ledgers"
export async function fetchPurchaseLedgerService() {
    return await getData(`${API_PATH}`)
}
export async function fetchPurchaseLedgerByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}
