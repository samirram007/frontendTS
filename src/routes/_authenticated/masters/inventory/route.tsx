
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Inventory from '@/features/inventory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/inventory')({
  component: Inventory,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

