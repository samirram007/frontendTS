
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Statutory from '@/features/statutory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/statutory')({
  component: Statutory,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

