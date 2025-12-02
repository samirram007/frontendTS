'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';

import Pos from './pos';
import { PosProvider } from './pos/contexts/pos-context';
import type { ReceiptNoteProps } from './pos/contracts';




const ReceiptNote = ({ currentRow }: ReceiptNoteProps) => {
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

export default ReceiptNote
