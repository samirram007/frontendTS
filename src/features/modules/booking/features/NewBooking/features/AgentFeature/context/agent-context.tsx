import React, { useState } from 'react';
import type { IAgent } from '../data/schema';



interface AgentContextType{
    agentDetail: IAgent | null;
    setAgentDetail: React.Dispatch<React.SetStateAction<IAgent | null>>;
    agentList: IAgent[] | null;
    setAgentList: React.Dispatch<React.SetStateAction<IAgent[] | null>>;
}



const AgentContext = React.createContext<AgentContextType | null>(null);


export default function AgentProvider({children}:{children: React.ReactNode}){

    const [agentDetail,setAgentDetail] = useState<IAgent | null>(null);
    const [agentList,setAgentList] = useState<IAgent[] | null>(null);

    return(
        <AgentContext.Provider value={{
            agentDetail,setAgentDetail,
            agentList,setAgentList
        }}>
            {children}
        </AgentContext.Provider>
    )
}


export const useAgent = () =>{
    const agentContext = React.useContext(AgentContext);

    if(!agentContext){
        throw new Error("usePatient has to be used within <PatientContext>");
    }

    return agentContext;
}