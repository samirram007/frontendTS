import React, { useState } from "react";





interface InfrastructureContextType {
    currentModule: string,
    setCurrentModule: (str: string) => void,
    sideBarOpen?: boolean,
    setSideBarOpen?: (open: boolean) => void,
    keyName: string
}

const InfastructureContext = React.createContext<InfrastructureContextType | null>(null);

interface Props {
    children: React.ReactNode
}


export default function InfrastructureProvider({ children }: Props) {
    const [currentModule, setCurrentModule] = useState<string>("facility");
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    return (
        <InfastructureContext.Provider value={{
            currentModule, setCurrentModule,
            setSideBarOpen, sideBarOpen,
            keyName: "infrastructure"
        }}>
            {children}
        </InfastructureContext.Provider>
    )
}


export const useInfrastructure = () => {
    const infrastructureContext = React.useContext(InfastructureContext);

    if (!infrastructureContext) {
        throw new Error("useInfrastructure has to be use inside <InfrastrucutreProvider>");
    }

    return infrastructureContext;
}