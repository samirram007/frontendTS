import React, { useState } from 'react';
import type { ILabTestItem, ITestItem } from '../data/schema';



interface LabItemContextType{
    labTestItemList: ILabTestItem[];
    setLabTestItemList: React.Dispatch<React.SetStateAction<ILabTestItem[]>>;
    selectTestItemList: ITestItem[];
    setSelectTestItemList: React.Dispatch<React.SetStateAction<ITestItem[]>>
}



const LabItemContext = React.createContext<LabItemContextType | null>(null);


export default function LabTestItemProvider({children}:{children: React.ReactNode}){


    const [labTestItemList,setLabTestItemList] = useState<ILabTestItem[]>([]);
    const [selectTestItemList,setSelectTestItemList] = useState<ITestItem[]>([]);

    return(
        <LabItemContext.Provider value={{
            labTestItemList,setLabTestItemList,
            selectTestItemList,setSelectTestItemList
        }}>
            {children}
        </LabItemContext.Provider>
    )
}


export const useLabTestItem = () =>{
    const labTestContext = React.useContext(LabItemContext);

    if(!labTestContext){
        throw new Error("useLabTest has to be used within <PatientContext>");
    }

    return labTestContext;
}