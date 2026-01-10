'use client'

import { useTransaction } from '@/features/transactions/context/transaction-context'
import { useEffect } from 'react'

import Pos from './pos'
import { PosProvider } from '../contexts/pos-context'
import type { DeliveryNoteProps } from './pos/contracts'

const DeliveryNote = ({ currentRow }: DeliveryNoteProps) => {
  const { setHeaderVisible } = useTransaction()
  useEffect(() => {
    setHeaderVisible?.(false)
  }, [])
  return (
    <>
      <PosProvider>
        <>
          <Pos currentRow={currentRow} />
        </>
      </PosProvider>
    </>
  )
}

export default DeliveryNote
