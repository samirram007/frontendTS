import { getData, postData, putData } from "@/utils/dataClient";




const API_PATH = 'beds';

export async function fetchBedService() {
    return await getData(API_PATH);
}
export async function fetchBedByIdService(id: string) {
    return await getData(`${API_PATH}/${id}`);
}
export async function storeBedService(payload: any) {
    return await postData(API_PATH, payload);
}
export async function udpateBedService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload);
}