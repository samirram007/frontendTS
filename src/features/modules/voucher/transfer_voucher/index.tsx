'use client'

import { useTransaction } from '@/features/transactions/context/transaction-context'
import { useEffect } from 'react'
import Pos from './pos'

import type { TransferVoucherProps } from './pos/contracts'
import { PosProvider } from '../contexts/pos-context'

const TransferVoucher = ({ currentRow }: TransferVoucherProps) => {
  const { setHeaderVisible } = useTransaction()
  useEffect(() => {
    setHeaderVisible?.(false)
  }, [])
  return (
    <>
      <PosProvider>
        <Pos currentRow={currentRow} />
      </PosProvider>
    </>
  )
}

export default TransferVoucher
