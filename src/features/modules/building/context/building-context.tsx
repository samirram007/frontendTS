import React, { useState } from "react";
import useDialogState from "@/core/hooks/use-dialog-state";
import type { Building } from "../data/schema";



type BuildingDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface BuildingContextType {
    open: BuildingDialogType | null
    setOpen: (str: BuildingDialogType | null) => void
    currentRow: Building | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Building | null>>
    keyName: string
}



const BuildingContext = React.createContext<BuildingContextType | null>(null);


interface Props {
    children: React.ReactNode
}


export default function BuildingProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<BuildingDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Building | null>(null)

    return (
        <BuildingContext value={{
            keyName: "building",
            open, setOpen,
            currentRow, setCurrentRow
        }}>
            {children}
        </BuildingContext>
    )
}



export const useBuilding = () => {

    const buildingContext = React.useContext(BuildingContext)

    if (!buildingContext) {
        throw new Error('useBuilding has to be used within <BuildingContext>')

    }

    return buildingContext;
}