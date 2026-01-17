import { getData, postData, putData } from "@/utils/dataClient";




const API_PATH = 'rooms';

export async function fetchRoomService() {
    return await getData(API_PATH);
}
export async function fetchRoomByIdService(id: string) {
    return await getData(`${API_PATH}/${id}`);
}
export async function storeRoomService(payload: any) {
    return await postData(API_PATH, payload);
}
export async function udpateRoomService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload);
}