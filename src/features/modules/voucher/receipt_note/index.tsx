'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';
import type { ReceiptNoteProps } from './components/form-action';
import Pos from './pos';





const ReceiptNote = ({ currentRow }: ReceiptNoteProps) => {
    const { setHeaderVisible } = useTransaction()
    useEffect(() => {
        setHeaderVisible?.(false)
    }, [])
    return (

        <>

            <Pos currentRow={currentRow} />
        </>
    )
}

export default ReceiptNote
