import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/test_items"
export async function fetchTestItemService() {
    return await getData(API_PATH)
}
export async function fetchTestItemByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}

export async function storeTestItemService(payload: any) {
    console.log(payload)
    return await postData(API_PATH, payload)
}
export async function updateTestItemService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}