import { useTransaction } from "@/features/transactions/context/transaction-context";
import type { PurchaseOrderProps } from "./pos/contracts";
import { useEffect } from "react";
import { PosProvider } from "../contexts/pos-context";
import { PurchaseOrderProvider } from "./contexts/purchase_order-context";
import Pos from "./pos";

const PurchaseOrder=({currentRow}:PurchaseOrderProps)=>{
    const {setHeaderVisible}=useTransaction()
    useEffect(()=>{
        setHeaderVisible?.(false)
    },[])

    return(
        <>
            <PosProvider>
                <PurchaseOrderProvider>
                    <>
                        <Pos currentRow={currentRow}/>
                    </>
                </PurchaseOrderProvider>
            </PosProvider>
        </>
    )
}

export default PurchaseOrder