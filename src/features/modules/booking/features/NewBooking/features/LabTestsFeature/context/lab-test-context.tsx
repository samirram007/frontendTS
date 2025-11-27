import React, { useState } from 'react';
import type { ILabTestItem, ITestItem } from '../data/schema';



interface LabItemContextType {
    labTestItemList: ILabTestItem[];
    setLabTestItemList: React.Dispatch<React.SetStateAction<ILabTestItem[]>>;
    selectTestItemList: ITestItem[];
    setSelectTestItemList: React.Dispatch<React.SetStateAction<ITestItem[]>>;
    itemDiscountValue: number;
    setItemDiscountValue: React.Dispatch<React.SetStateAction<number>>;
    itemDiscountPercent: number;
    setItemDiscountPercent: React.Dispatch<React.SetStateAction<number>>;
    itemDiscountedValue: number,
    setItemDiscountedValue: React.Dispatch<React.SetStateAction<number>>
}



const LabItemContext = React.createContext<LabItemContextType | null>(null);


export default function LabTestItemProvider({ children }: { children: React.ReactNode }) {


    const [labTestItemList, setLabTestItemList] = useState<ILabTestItem[]>([]);
    const [selectTestItemList, setSelectTestItemList] = useState<ITestItem[]>([]);
    const [itemDiscountPercent, setItemDiscountPercent] = useState<number>(0);
    const [itemDiscountValue, setItemDiscountValue] = useState<number>(0);
    const [itemDiscountedValue, setItemDiscountedValue] = useState<number>(0);

    return (
        <LabItemContext.Provider value={{
            labTestItemList, setLabTestItemList,
            selectTestItemList, setSelectTestItemList,
            itemDiscountPercent, setItemDiscountPercent,
            itemDiscountValue, setItemDiscountValue,
            itemDiscountedValue, setItemDiscountedValue
        }}>
            {children}
        </LabItemContext.Provider>
    )
}


export const useLabTestItem = () => {
    const labTestContext = React.useContext(LabItemContext);

    if (!labTestContext) {
        throw new Error("useLabTest has to be used within <PatientContext>");
    }

    return labTestContext;
}