import BusinessReport from '@/features/modules/business_report'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/reports/business-report/',
)({
  component: BusinessReport,
})


