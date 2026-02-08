import { getData, postData, putData } from '@/utils/dataClient'

const API_PATH = '/vouchers'
export async function fetchTransferVoucherService() {
  return await getData(API_PATH)
}
export async function fetchTransferVoucherByIdService(id: number) {
  //console.log(`${API_PATH} / ${id}`)
  return await getData(`${API_PATH}/${id}`)
}

export async function storeTransferVoucherService(payload: any) {
  console.log('payload', payload)
  return await postData(API_PATH, payload)
}
export async function updateTransferVoucherService(payload: any) {
  console.log('Updatable Payload: ', payload)
  return await putData(`${API_PATH}/${payload.id}`, payload)
}

export async function fetchPurchaseLedgersService() {
  return await getData('purchase_ledgers')
}
export async function fetchStockInHandLedgersService() {
  return await getData('stock_in_hand_ledgers')
}
export async function fetchLedgerBalanceService(id: number) {
  return await getData(`ledger_balance/${id}`)
}
