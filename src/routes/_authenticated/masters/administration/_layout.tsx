
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'
import Administration from '@/features/masters/administration'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/masters/administration/_layout')({
  component: Administration,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})

