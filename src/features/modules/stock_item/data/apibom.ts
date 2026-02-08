import { getData, postData, putData } from '@/utils/dataClient'

const API_PATH = '/boms'
export async function fetchBomItemService() {
  return await getData(API_PATH)
}
export async function fetchBomItemByIdService(id: number) {
  return await getData(`${API_PATH}/${id}`)
}

export async function storeBomItemService(payload: any) {
  console.log(payload)
  return await postData(API_PATH, payload)
}
export async function updateBomItemService(payload: any) {
  return await putData(`${API_PATH}/${payload.id}`, payload)
}

export async function fetchBomItemByStockItemIdService(stockItemId: number) {
  // console.log('here')

  return await getData(`${API_PATH}/stock-item/${stockItemId}`)
}
