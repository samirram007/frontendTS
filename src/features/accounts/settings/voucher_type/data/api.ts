import { getData, postData, putData } from "@/utils/dataClient";

async function fetchVoucherTypeService() {
    return await getData("/voucher_types")
}
async function storeVoucherTypeService(payload: any) {
    return await postData("/voucher_types", payload)
}
async function updateVoucherTypeService(payload: any) {
    return await putData(`/voucher_types/${payload.id}`, payload)
}
async function deleteVoucherTypeService(payload: any) {
    return await putData(`/voucher_types/${payload.id}`, payload)
}

export { deleteVoucherTypeService, fetchVoucherTypeService, storeVoucherTypeService, updateVoucherTypeService };

