import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/vouchers"
export async function fetchReceiptNoteService() {
    return await getData(API_PATH)
}
export async function fetchReceiptNoteByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}

export async function storeReceiptNoteService(payload: any) {
    return await postData(API_PATH, payload)
}
export async function updateReceiptNoteService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}