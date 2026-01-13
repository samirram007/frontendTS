import { getData, postData, putData } from '@/utils/dataClient'

const API_PATH = '/patients'
export async function fetchPatientService() {
  return await getData(API_PATH)
}
export async function fetchPatientByIdService(id: number) {
  return await getData(`${API_PATH}/${id}`)
}

export async function storePatientService(payload: any) {
  console.log('Patient payload: ', payload)
  return await postData(API_PATH, payload)
}
export async function updatePatientService(payload: any) {
  console.log(payload)
  return await putData(`${API_PATH}/${payload.id}`, payload)
}
