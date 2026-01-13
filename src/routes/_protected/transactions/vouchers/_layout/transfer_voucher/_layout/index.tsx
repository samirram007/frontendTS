import TransferVoucher from '@/features/modules/voucher/transfer_voucher'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/transactions/vouchers/_layout/transfer_voucher/_layout/',
)({
  component: TransferVoucher,
})
