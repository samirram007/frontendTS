import React, { useState } from "react";
import useDialogState from "@/core/hooks/use-dialog-state";
import type { Bed } from "../data/schema";



type BedDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface BedContextType {
    open: BedDialogType | null
    setOpen: (str: BedDialogType | null) => void
    currentRow: Bed | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Bed | null>>
    keyName: string
}



const BedContext = React.createContext<BedContextType | null>(null);


interface Props {
    children: React.ReactNode
}


export default function BedProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<BedDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Bed | null>(null)

    return (
        <BedContext value={{
            keyName: "bed",
            open, setOpen,
            currentRow, setCurrentRow
        }}>
            {children}
        </BedContext>
    )
}



export const useBed = () => {

    const bedContext = React.useContext(BedContext)

    if (!bedContext) {
        throw new Error('useBed has to be used within <BedContext>')

    }

    return bedContext;
}