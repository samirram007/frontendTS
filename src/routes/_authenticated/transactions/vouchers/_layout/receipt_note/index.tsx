import ReceiptNote from '@/features/modules/voucher/receipt_note'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/vouchers/_layout/receipt_note/',
)({
  component: ReceiptNote,
})

