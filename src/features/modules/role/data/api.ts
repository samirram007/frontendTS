import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/roles"
export async function fetchRoleService() {
    return await getData(API_PATH)
}
export async function storeRoleService(payload: any) {
    
    return await postData(API_PATH, payload)
}
export async function updateRoleService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}