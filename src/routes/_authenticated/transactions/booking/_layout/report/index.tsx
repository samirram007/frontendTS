import Reporting from '@/features/modules/reporting/Reporting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/_layout/report/',
)({
  component: Reporting,
})

