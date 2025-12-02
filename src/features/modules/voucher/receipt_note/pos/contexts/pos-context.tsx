import React, { createContext } from "react"


interface PosContextType {

    remarksRef: React.RefObject<HTMLTextAreaElement | null>
    saveButtonVisible?: boolean
    setSaveButtonVisible?: React.Dispatch<React.SetStateAction<boolean>>
    isRemarksDisabled?: boolean
    setIsRemarksDisabled?: React.Dispatch<React.SetStateAction<boolean>>

}
const PosContext = createContext<PosContextType | null>(null)

export const PosProvider = ({ children }: { children: React.ReactNode }) => {

    const remarksRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [saveButtonVisible, setSaveButtonVisible] = React.useState<boolean>(false)
    const [isRemarksDisabled, setIsRemarksDisabled] = React.useState(true);
    return (
        <PosContext.Provider
            value={{
                remarksRef,
                saveButtonVisible, setSaveButtonVisible,
                isRemarksDisabled, setIsRemarksDisabled
            }}>
            {children}
        </PosContext.Provider>
    )

}


export const usePos = () => {
    const posContext = React.useContext(PosContext)

    if (!posContext) {
        throw new Error('usePos has to be used within <PosProvider>')
    }

    return posContext
}

