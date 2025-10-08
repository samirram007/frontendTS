import { type PatientListSchema } from "../data/schema";
import React, { useState } from 'react';
import type { IPatient } from "../features/NewBooking/features/CreatePatientFeature/data/schema";



interface PatientContextType{
    patientList: PatientListSchema;
    setPatientList: React.Dispatch<React.SetStateAction<PatientListSchema>>;
    patient: IPatient | null;
    setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>;
}



const PatientContext = React.createContext<PatientContextType | null>(null);


export default function PatientProvider({children}:{children: React.ReactNode}){

    const [patientList,setPatientList] = useState<PatientListSchema>([]);
    const [patient,setPatient] = useState<IPatient | null>(null);

    return(
        <PatientContext.Provider value={{
            patientList,setPatientList,
            patient,setPatient
        }}>
            {children}
        </PatientContext.Provider>
    )
}


export const usePatient = () =>{
    const patientContext = React.useContext(PatientContext);

    if(!patientContext){
        throw new Error("usePatient has to be used within <PatientContext>");
    }

    return patientContext;
}