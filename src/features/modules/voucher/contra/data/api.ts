import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/vouchers"
export async function fetchContraService() {
    return await getData(API_PATH)
}
export async function fetchContraByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}

export async function storeContraService(payload: any) {
    return await postData(API_PATH, payload)
}
export async function updateContraService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}