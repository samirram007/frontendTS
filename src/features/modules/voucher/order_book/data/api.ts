import { getData, postData, putData } from '@/utils/dataClient'

const API_PATH = '/order_books'

async function fetchOrderBookService() {
  const data = await getData(API_PATH)

  console.log(data)

  return data
}
async function storeOrderBookService(payload: any) {
  return await postData(API_PATH, payload)
}
async function updateOrderBookService(payload: any) {
  return await putData(`${API_PATH}/${payload.id}`, payload)
}
async function deleteOrderBookService(payload: any) {
  return await putData(`${API_PATH}/${payload.id}`, payload)
}

export {
  deleteOrderBookService,
  fetchOrderBookService,
  storeOrderBookService,
  updateOrderBookService,
}
