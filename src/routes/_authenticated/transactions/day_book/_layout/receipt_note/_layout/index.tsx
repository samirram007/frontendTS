import ReceiptNote from '@/features/modules/voucher/receipt_note'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/day_book/_layout/receipt_note/_layout/',
)({
  component: ReceiptNote,
})

