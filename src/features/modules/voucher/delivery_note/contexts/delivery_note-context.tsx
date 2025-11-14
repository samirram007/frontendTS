import { createContext, useContext, type KeyboardEvent } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { DeliveryNoteForm } from "../data/schema"

type DeliveryNoteContextType = UseFormReturn<DeliveryNoteForm> & {
    handleEnterAsTab: (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const DeliveryNoteContext = createContext<DeliveryNoteContextType | null>(null)

export const DeliveryNoteProvider = ({ children }: {
    children: React.ReactNode
} & UseFormReturn<DeliveryNoteForm>) => {
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



    return <DeliveryNoteContext.Provider value={null}>{children}</DeliveryNoteContext.Provider>
}

export const useDeliveryNoteForm = () => useContext(DeliveryNoteContext)

