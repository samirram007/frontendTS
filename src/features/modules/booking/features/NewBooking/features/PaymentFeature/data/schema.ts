export enum PaymentTypeSchema{
  CASH = "CASH",
  DEBIT_CARD = "DEBIT CARD",
  CREDIT_CARD = "CREDIT CARD",
  UPI = "UPI"
}


export interface IPaymentMethod{
  name: string,
  ledgerId: string
}


export const PaymentMethodSchema: IPaymentMethod[] = [
  {
    "name":"CASH",
    "ledgerId":"1"
  },
  {
    "name":"CREDIT CARD",
    "ledgerId":"1"
  },
  {
    "name":"DEBIT CARD",
    "ledgerId":"1"
  },
  {
    "name":"UPI",
    "ledgerId":"1"
  }
]