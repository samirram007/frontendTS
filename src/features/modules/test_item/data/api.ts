import { getData, postData, putData } from "@/utils/dataClient"


const API_PATH = "/test_items"
const REPORT_API_PATH="/test_item_report_templates"

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




//  store template
export async function storeTestItemReportTemplateFileService(payload: any) {
    return await postData(REPORT_API_PATH, payload)
}

export async function updateTestItemReportTemplateFileService(payload: any) {
    return await postData(REPORT_API_PATH, payload)
}

// get Template By Id
export async function fetchTestItemReportTemplateByIdService(id: number) {
    return await getData(`${REPORT_API_PATH}/${id}`)
}
export async function fetchTestItemReportTemplateService() {
    return await getData(REPORT_API_PATH)
}