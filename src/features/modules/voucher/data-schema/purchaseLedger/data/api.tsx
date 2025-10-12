import { getData } from "@/utils/dataClient"

const API_PATH = "/purchasable_stock_items"
export async function fetchPurchasableStockItemService() {
    return await getData(`${API_PATH}`)
}
export async function fetchPurchasableStockItemByIdService(id: number) {
    return await getData(`${API_PATH}/${id}`)
}
