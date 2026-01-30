import React, { createContext } from "react"


type PhysicalStockContextType = {

    config: { key: string, value: boolean }[]
}


const PhysicalStockContext = createContext<PhysicalStockContextType | null>(null)

export const PhysicalStockProvider = ({ children }: { children: React.ReactNode }) => {


    const config = [
        { key: 'order_details', value: false },
        { key: 'receipt_details', value: true },
        { key: 'freight_details', value: true },
        { key: 'freight_method', value: 2 },
    ]
    const value = {
        config
    } as PhysicalStockContextType



    return <PhysicalStockContext.Provider value={value}>
        {children}
    </PhysicalStockContext.Provider>
}

export const usePhysicalStock = () => {
    const physicalStockContext = React.useContext(PhysicalStockContext)

    if (!physicalStockContext) {
        throw new Error('usePhysicalStock has to be used within <PhysicalStockContext>')
    }

    return physicalStockContext
}
