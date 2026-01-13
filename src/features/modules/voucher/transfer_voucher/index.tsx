import { useTransaction } from '@/features/transactions/context/transaction-context'

const TransferVoucher = () => {
  const { setHeaderVisible } = useTransaction()
  console.log(setHeaderVisible)

  return (
    <>
      <h1>Transfer Voucher</h1>
    </>
  )
}

export default TransferVoucher
