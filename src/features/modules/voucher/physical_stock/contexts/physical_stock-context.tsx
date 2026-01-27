import { createContext, useContext, type KeyboardEvent } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { PhysicalStockForm } from "../data/schema"

type PhysicalStockContextType = UseFormReturn<PhysicalStockForm> & {
    handleEnterAsTab: (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const PhysicalStockContext = createContext<PhysicalStockContextType | null>(null)

export const PhysicalStockProvider = ({ children }: {
    children: React.ReactNode
} & UseFormReturn<PhysicalStockForm>) => {
    // const handleEnterAsTab = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault() // prevent form submit

    //         const form = e.currentTarget.form
    //         if (!form) return

    //         const focusable = Array.from(
    //             form.querySelectorAll<HTMLElement>(
    //                 'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
    //             )
    //         ).filter((el) => el.tabIndex >= 0)

    //         const index = focusable.indexOf(e.currentTarget)
    //         if (index >= 0 && index < focusable.length - 1) {
    //             focusable[index + 1].focus()
    //         }
    //     }
    // }



    return <PhysicalStockContext.Provider value={null}>{children}</PhysicalStockContext.Provider>
}

export const usePhysicalStockForm = () => useContext(PhysicalStockContext)

