import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { OrderbookSchema } from '../data/schema'
// import type { OrderBookSchema } from '../data/schema'

type OrderbookDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface OrderbookContextType {
  open: OrderbookDialogType | null
  setOpen: (str: OrderbookDialogType | null) => void
  currentRow: OrderbookSchema | null
  setCurrentRow: React.Dispatch<React.SetStateAction<OrderbookSchema | null>>
  keyName: string
}

const OrderbookContext = React.createContext<OrderbookContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function OrderbookProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<OrderbookDialogType>(null)
  const [currentRow, setCurrentRow] = useState<OrderbookSchema | null>(null)

  return (
    <OrderbookContext
      value={{ open, setOpen, currentRow, setCurrentRow, keyName: 'day_books' }}
    >
      {children}
    </OrderbookContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderbook = () => {
  const orderbookContext = React.useContext(OrderbookContext)

  if (!orderbookContext) {
    throw new Error('useOrderbook has to be used within <OrderbookContext>')
  }

  return orderbookContext
}
