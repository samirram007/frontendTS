import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { StockSummarySchema } from '../../stock_summary/data/schema'





type FreightDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface FreightContextType {
  open: FreightDialogType | null
  setOpen: (str: FreightDialogType | null) => void
  currentRow: StockSummarySchema | null
  setCurrentRow: React.Dispatch<React.SetStateAction<StockSummarySchema | null>>
  keyName: string,
  config: { key: string, value: boolean | string | number }[]
}

const FreightContext = React.createContext<FreightContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function FreightProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<FreightDialogType>(null)
  const [currentRow, setCurrentRow] = useState<StockSummarySchema | null>(null)
  const config = [
    { key: 'order_details', value: false },
    { key: 'receipt_details', value: true },
    { key: 'freight_details', value: true },
    { key: 'freight_method', value: 2 },
  ]

  return (
    <FreightContext.Provider value={{ config, open, setOpen, currentRow, setCurrentRow, keyName: "day_books" }}>
      {children}
    </FreightContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFreight = () => {
  const freightContext = React.useContext(FreightContext)

  if (!freightContext) {
    throw new Error('useFreight has to be used within <FreightContext.Provider>')
  }

  return freightContext
}
