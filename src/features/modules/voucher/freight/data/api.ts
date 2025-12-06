import { getData, postData, putData } from "@/utils/dataClient";



const API_PATH = "/freights"

async function fetchFreightService(type: string) {

    return await getData(`${API_PATH}/${type}`);
}

async function storeFreightService(data: any) {
    // Placeholder for actual implementation
    Promise.resolve();

    return await postData(`${API_PATH}`, data);
}

async function updateFreightService(data: any) {
    // Placeholder for actual implementation
    Promise.resolve();
    return await putData(`${API_PATH}/${data.id}`, data);
}

async function storeVoucherDispatchDetailService(data: any) {
    // Placeholder for actual implementation
    Promise.resolve();
    return await postData(`/voucher_dispatch_details`, data);
}
async function updateVoucherDispatchDetailService(data: any) {
    // Placeholder for actual implementation
    //console.log(data)
    Promise.resolve();
    return await putData(`/voucher_dispatch_details/${data.id}`, data);
}

export { fetchFreightService, storeFreightService, updateFreightService, storeVoucherDispatchDetailService, updateVoucherDispatchDetailService };
