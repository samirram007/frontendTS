import React, { useState } from 'react'





interface TransactionContextType {
    currentModule: string
    setCurrentModule: (str: string) => void
    sideBarOpen?: boolean
    setSideBarOpen?: (open: boolean) => void
    headerVisible?: boolean
    setHeaderVisible?: (visible: boolean) => void
    keyName: string
}

const TransactionContext = React.createContext<TransactionContextType | null>(null)

interface Props {
    children: React.ReactNode
}

export default function TransactionProvider({ children }: Props) {
    const [currentModule, setCurrentModule] = useState<string>("user")
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const [headerVisible, setHeaderVisible] = useState<boolean>(false)




    return (
        <TransactionContext.Provider value={{
            currentModule,
            setCurrentModule,
            sideBarOpen,
            setSideBarOpen,
            headerVisible,
            setHeaderVisible,
            keyName: "transaction"
        }}>
            {children}
        </TransactionContext.Provider>
    )
}


export const useTransaction = () => {
    const transactionContext = React.useContext(TransactionContext)

    if (!transactionContext) {
        throw new Error('useTransaction has to be used within <TransactionProvider>')
    }

    return transactionContext
}
