import { createContext, useContext } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { ReceiptNoteForm } from "../data/schema"

type ReceiptNoteContextType = UseFormReturn<ReceiptNoteForm>

const ReceiptNoteContext = createContext<ReceiptNoteContextType | null>(null)

export const ReceiptNoteProvider = ({ children }: {
    children: React.ReactNode
}) => {

    return <ReceiptNoteContext.Provider value={null}>{children}</ReceiptNoteContext.Provider>
}

export const useReceiptNoteForm = () => useContext(ReceiptNoteContext)

