'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';

import Pos from './pos';

import type { ReceiptNoteProps } from './pos/contracts';
import { PosProvider } from '../contexts/pos-context';
import { useMatch } from '@tanstack/react-router';




const ReceiptNote = ({ currentRow }: ReceiptNoteProps) => {

    // const match = useMatch({
    //     from: "/transactions/vouchers/receipt_note"
    // })

    // const purchaseOrder = match.state?.purchaseOrder

    // console.log(purchaseOrder)
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
