'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';

import Pos from './pos';
import type { DeliveryNoteProps } from './pos/contracts';




const DeliveryNote = ({ currentRow }: DeliveryNoteProps) => {
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

export default DeliveryNote
