import React, { useState } from "react";
import useDialogState from "@/core/hooks/use-dialog-state";
import type { Room } from "../data/schema";



type RoomDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface RoomContextType {
    open: RoomDialogType | null
    setOpen: (str: RoomDialogType | null) => void
    currentRow: Room | null
    setCurrentRow: React.Dispatch<React.SetStateAction<Room | null>>
    keyName: string
}



const RoomContext = React.createContext<RoomContextType | null>(null);


interface Props {
    children: React.ReactNode
}


export default function RoomProvider({ children }: Props) {
    const [open, setOpen] = useDialogState<RoomDialogType>(null)
    const [currentRow, setCurrentRow] = useState<Room | null>(null)

    return (
        <RoomContext value={{
            keyName: "room",
            open, setOpen,
            currentRow, setCurrentRow
        }}>
            {children}
        </RoomContext>
    )
}



export const useRoom = () => {

    const roomContext = React.useContext(RoomContext)

    if (!roomContext) {
        throw new Error('useRoom has to be used within <RoomContext>')

    }

    return roomContext;
}