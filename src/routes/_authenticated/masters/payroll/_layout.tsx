
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Payroll from '@/features/masters/payroll'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/payroll/_layout')({
  component: Payroll,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

