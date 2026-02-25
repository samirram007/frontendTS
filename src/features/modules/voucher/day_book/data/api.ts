import { getData, postData, putData } from '@/utils/dataClient'

const API_PATH = '/day_books'

async function fetchDayBookService() {
  const data = await getData(API_PATH)

  console.log(data)

  return data
}
async function storeDayBookService(payload: any) {
  return await postData(API_PATH, payload)
}
async function updateDayBookService(payload: any) {
  return await putData(`${API_PATH}/${payload.id}`, payload)
}
async function deleteDayBookService(payload: any) {
  return await putData(`${API_PATH}/${payload.id}`, payload)
}

export {
  deleteDayBookService,
  fetchDayBookService,
  storeDayBookService,
  updateDayBookService,
}
