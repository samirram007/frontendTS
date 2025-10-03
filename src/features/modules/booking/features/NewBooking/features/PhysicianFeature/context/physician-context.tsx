import React, { useState } from 'react';
import type { IPhysician } from '../data/schema';



interface PhysicianContextType{
    physicianDetail: IPhysician | null;
    setPhysicianDetail: React.Dispatch<React.SetStateAction<IPhysician | null>>;
}



const PhysicianContext = React.createContext<PhysicianContextType | null>(null);


export default function PhysicianProvider({children}:{children: React.ReactNode}){

    const [physicianDetail,setPhysicianDetail] = useState<IPhysician | null>(null);

    return(
        <PhysicianContext.Provider value={{
            physicianDetail,setPhysicianDetail
        }}>
            {children}
        </PhysicianContext.Provider>
    )
}


export const usePhysician = () =>{
    const physicianContext = React.useContext(PhysicianContext);

    if(!physicianContext){
        throw new Error("usePatient has to be used within <PatientContext>");
    }

    return physicianContext;
}