import PurchaseOrder from '@/features/modules/voucher/purchase_order'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/reports/day_book/_layout/purchase_order/_layout/',
)({
  component: PurchaseOrder,
})
