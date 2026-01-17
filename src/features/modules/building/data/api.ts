import { getData, postData, putData } from "@/utils/dataClient";




const API_PATH = 'buildings';


export async function fetchBuildingService() {
    return await getData(API_PATH);
}
export async function fetchBuildingByIdService(id: string) {
    return await getData(`${API_PATH}/${id}`);
}
export async function storeBuildingService(payload: any) {
    return await postData(API_PATH, payload);
}
export async function udpateBuildingService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload);
}