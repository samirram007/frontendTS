import type { UseFormReturn } from "react-hook-form";
import type { PurchaseOrderForm } from "../data/schema";
import { createContext, useContext } from "react";

type FormContextType = UseFormReturn<PurchaseOrderForm>

const FormContext = createContext<FormContextType | null>(null)

export const usePurchaseForm = () => {
    const ctx = useContext(FormContext)
    if (!ctx) throw new Error("usePurchaseForm must be used inside FormProvider")
    return ctx
}

export const FormProvider = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full grid grid-rows-[1fr_100px]  h-[calc(100dvh_-_200px)]">
            {children}
        </div>
    )
}