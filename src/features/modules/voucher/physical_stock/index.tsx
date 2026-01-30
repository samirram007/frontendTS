'use client'


import { useTransaction } from '@/features/transactions/context/transaction-context';
import { useEffect } from 'react';

import Pos from './pos';
import { PosProvider } from '../contexts/pos-context';
import type { PhysicalStockProps } from './pos/contracts';
import { PhysicalStockProvider } from './contexts/physical_stock-context';







const PhysicalStock = ({ currentRow }: PhysicalStockProps) => {
    const { setHeaderVisible } = useTransaction()
    useEffect(() => {
        setHeaderVisible?.(false)
    }, [])
    return (

        <>

            <PosProvider>
                <PhysicalStockProvider>

                    <>

                        <Pos currentRow={currentRow} />
                    </>

                </PhysicalStockProvider>
            </PosProvider>


        </>
    )
}

export default PhysicalStock
