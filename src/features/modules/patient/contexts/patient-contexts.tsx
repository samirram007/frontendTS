import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { Patient } from '../data/schema'
// import type { Employee } from '../data/schema'

type PatientDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface PatientContextType {
  open: PatientDialogType | null
  setOpen: (str: PatientDialogType | null) => void
  currentRow: Patient | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Patient | null>>
  keyName: string
}

const PatientContext = React.createContext<PatientContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PatientProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PatientDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Patient | null>(null)

  return (
    <PatientContext
      value={{ open, setOpen, currentRow, setCurrentRow, keyName: 'patient' }}
    >
      {children}
    </PatientContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePatient = () => {
  const patientContext = React.useContext(PatientContext)

  if (!patientContext) {
    throw new Error('usePatient has to be used within <PatientContext>')
  }

  return patientContext
}
