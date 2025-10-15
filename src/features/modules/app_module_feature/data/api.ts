import { getData, postData, putData } from "@/utils/dataClient";


const API_PATH = "/app_module_features"

async function fetchAppModuleFeatureService() {
    return await getData(API_PATH)
}
async function storeAppModuleFeatureService(payload: any) {
    return await postData(API_PATH, payload)
}
async function updateAppModuleFeatureService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}
async function deleteAppModuleFeatureService(payload: any) {
    return await putData(`${API_PATH}/${payload.id}`, payload)
}

export { deleteAppModuleFeatureService, fetchAppModuleFeatureService, storeAppModuleFeatureService, updateAppModuleFeatureService };

