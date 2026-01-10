
import TransporterProvider from '@/features/modules/transporter/contexts/transporter-context'
import FreightProvider from '@/features/modules/voucher/freight/contexts/freight-context'
import TransactionProvider from '@/features/transactions/context/transaction-context'
import TransactionLayout from '@/features/transactions/layouts/transaction-layout'
import { createFileRoute } from '@tanstack/react-router'
import { Dialogs as TransporterDialog } from '@/features/modules/transporter/components/dialogs'
import { Dialogs as DeliveryVehicleDialog } from '@/features/modules/delivery_vehicle/components/dialogs'
import DeliveryVehicleProvider from '@/features/modules/delivery_vehicle/contexts/delivery_vehicle-context'
export const Route = createFileRoute(
  '/_protected/transactions/freight/_layout',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <TransporterProvider>
      <DeliveryVehicleProvider>
        <TransactionProvider>
          <FreightProvider>
            <TransactionLayout />
          </FreightProvider>
        </TransactionProvider>
        <DeliveryVehicleDialog />
      </DeliveryVehicleProvider>
      <TransporterDialog />
    </TransporterProvider>
  )
}

