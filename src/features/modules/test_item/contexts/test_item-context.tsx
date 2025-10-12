import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { TestItem } from '../data/schema'



type TestItemDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface TestItemContextType {
  open: TestItemDialogType | null
  setOpen: (str: TestItemDialogType | null) => void
  currentRow: TestItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<TestItem | null>>
  keyName: string,
  config: { key: string, value: boolean }[]
}

const TestItemContext = React.createContext<TestItemContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TestItemProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TestItemDialogType>(null)
  const [currentRow, setCurrentRow] = useState<TestItem | null>(null)
  const config = [
    { key: 'alternate_units', value: true },
    { key: 'batch_serial', value: true },
    { key: 'bom', value: true },
  ]

  return (
    <TestItemContext value={{ open, setOpen, currentRow, setCurrentRow, config, keyName: "account_nature" }}>
      {children}
    </TestItemContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTestItem = () => {
  const testitemContext = React.useContext(TestItemContext)

  if (!testitemContext) {
    throw new Error('useTestItem has to be used within <TestItemContext>')
  }

  return testitemContext
}
