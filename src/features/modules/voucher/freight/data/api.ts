import { getData, postData, putData } from "@/utils/dataClient";



const API_PATH = "/freights"

async function fetchFreightService(type: string) {

    return await getData(`${API_PATH}/${type}`);
}
async function fetchFreightReportService(type: string) {

    return await getData(`${API_PATH}/${type}`);
}

async function storeFreightService(data: any) {
    // Placeholder for actual implementation
    console.log("storeFreightService", data)
    Promise.resolve();

    return await postData(`${API_PATH}`, data);
}

async function updateFreightService(data: any) {
    // Placeholder for actual implementation
    console.log("updateFreightService", data)
    Promise.resolve();
    return await putData(`${API_PATH}/${data.id}`, data);
}

async function storeVoucherDispatchDetailService(data: any) {
    // Placeholder for actual implementation
    console.log("storeVoucherDispatchDetailService", data)
    Promise.resolve();
    return await postData(`/voucher_dispatch_details`, data);
}
async function updateVoucherDispatchDetailService(data: any) {
    // Placeholder for actual implementation
    //console.log(data)
    Promise.resolve();
    return await putData(`/voucher_dispatch_details/${data.id}`, data);
}

export { fetchFreightService, fetchFreightReportService, storeFreightService, updateFreightService, storeVoucherDispatchDetailService, updateVoucherDispatchDetailService };
