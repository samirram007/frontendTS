import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/vehicles"
export async function fetchVehicleService() {
    return await getData(API_PATH)
}
export async function storeVehicleService(payload: any) {
    return await postData(API_PATH, payload)
}
export async function updateVehicleService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}