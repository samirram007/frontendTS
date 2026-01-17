import { getData, postData, putData } from "@/utils/dataClient";




const API_PATH = 'floors';

export async function fetchFloorService() {
    return await getData(API_PATH);
}
export async function fetchFloorByIdService(id: string) {
    return await getData(`${API_PATH}/${id}`);
}
export async function storeFloorService(payload: any) {
    return await postData(API_PATH, payload);
}
export async function udpateFloorService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload);
}