'use client'

import type { Patient } from '../data/schema'
import { FormAction } from './form-action'

interface Props {
  currentRow?: Patient
}

export function ActionPages({ currentRow }: Props) {
  return <FormAction currentRow={currentRow} />
}
