import PhysicalStock from '@/features/modules/voucher/physical_stock'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/transactions/_provider/vouchers/_layout/physical_stock/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PhysicalStock />
  )
}
