import React, { createContext } from "react"

type PurchaseOrderContextType = {
    config: { key: string, value: boolean }[]
}

const PurchaseOrderContext = createContext<PurchaseOrderContextType | null>(null)

export const PurchaseOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const config = [
        { key: 'order_details', value: false },
        { key: 'receipt_details', value: true },
        { key: 'freight_details', value: true },
        { key: 'freight_method', value: 2 },
    ]
    const value = {
        config
    } as PurchaseOrderContextType

    return <PurchaseOrderContext.Provider value={value}>{children}</PurchaseOrderContext.Provider>
}

export const usePurchaseOrder = () => {
    const purchaseOrderContext = React.useContext(PurchaseOrderContext)
    if (!purchaseOrderContext) {
        throw new Error('usePurchaseOrder has to be used within <PurchaseOrderContext>')
    }
    return purchaseOrderContext
}