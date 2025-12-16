import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/delivery_places"
export async function fetchDeliveryPlaceService() {
    return await getData(API_PATH)
}
export async function storeDeliveryPlaceService(payload: any) {
    return await postData(API_PATH, payload)
}
export async function updateDeliveryPlaceService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}