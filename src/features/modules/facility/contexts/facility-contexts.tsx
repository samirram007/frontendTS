import React, { useState } from "react";
import type { FacilityInterface } from "../data/schema";
import useDialogState from "@/core/hooks/use-dialog-state";



type FacilityDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface FacilityContextType {
    open: FacilityDialogType | null
    setOpen: (str: FacilityDialogType | null) => void
    currentRow: FacilityInterface | null
    setCurrentRow: React.Dispatch<React.SetStateAction<FacilityInterface | null>>
    keyName: string
}



const FacilityContext = React.createContext<FacilityContextType | null>(null);


interface Props {
    children: React.ReactNode
}


export default function FacilityProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<FacilityDialogType>(null)
    const [currentRow, setCurrentRow] = useState<FacilityInterface | null>(null)

    return (
        <FacilityContext value={{
            keyName: "facility",
            open, setOpen,
            currentRow, setCurrentRow
        }}>
            {children}
        </FacilityContext>
    )
}



export const useFacility = () => {

    const facilityContext = React.useContext(FacilityContext)

    if (!facilityContext) {
        throw new Error('useFacility has to be used within <FacilityContext>')

    }

    return facilityContext;
}