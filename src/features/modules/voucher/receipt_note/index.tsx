'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';

import Pos from './pos';
import type { ReceiptNoteProps } from './pos/contracts';




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
