import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/transactions/booking/_layout/test_report/detail',
)({
  component: ReportDetailComponent,
})

function ReportDetailComponent(){
  return(
    <>
    </>
  )
}