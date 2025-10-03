
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Party from '@/features/masters/party'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/party/_layout')({
  component: Party,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

