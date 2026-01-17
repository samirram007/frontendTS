import React, { useState } from "react";
import useDialogState from "@/core/hooks/use-dialog-state";
import type { Floor } from "../data/schema";



type FloorDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface FloorContextType {
    open: FloorDialogType | null
    setOpen: (str: FloorDialogType | null) => void
    currentRow: Floor | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Floor | null>>
    keyName: string
}



const FloorContext = React.createContext<FloorContextType | null>(null);


interface Props {
    children: React.ReactNode
}


export default function FloorProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<FloorDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Floor | null>(null)

    return (
        <FloorContext value={{
            keyName: "floor",
            open, setOpen,
            currentRow, setCurrentRow
        }}>
            {children}
        </FloorContext>
    )
}



export const useFloor = () => {

    const floorContext = React.useContext(FloorContext)

    if (!floorContext) {
        throw new Error('useFloor has to be used within <FloorContext>')

    }

    return floorContext;
}