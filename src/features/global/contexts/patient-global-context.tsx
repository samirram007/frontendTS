import type { IPatient } from "@/features/modules/booking/features/NewBooking/features/CreatePatientFeature/data/schema";
import React, { useState } from "react";






interface IPatientContext{
    patientGlobalData: IPatient | null,
    setPatientGlobalData: React.Dispatch<React.SetStateAction<IPatient | null>>
}

const PatientGlobalContext = React.createContext<IPatientContext | null>(null);



export default function PatientGlobalProvider({children}:{children: React.ReactNode}){

    const [patientGlobalData,setPatientGlobalData] = useState<IPatient | null>(null);

    return(
        <PatientGlobalContext.Provider value={{
            patientGlobalData,setPatientGlobalData
        }}>
            {children}
        </PatientGlobalContext.Provider>
    )
}



export const  useGlobalPatient = () =>{

    const patientGlobalContext = React.useContext(PatientGlobalContext);

    if(!patientGlobalContext){
        throw new Error("useGlobalPatient should be used inside PatientGlobalProvider");
    }
    return patientGlobalContext;
}