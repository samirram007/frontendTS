import type { ITestItem } from "@/features/booking/data/schema";
import { createContext } from "react";




interface ITestBooking{
    selectedLabTest: ITestItem[] | [];
    setSelectedLabTest: React.Dispatch<React.SetStateAction<ITestItem[]>>,
    calculateTestDiscount:()=> void;
}


const defaultTest: ITestBooking={
    selectedLabTest: [],
    setSelectedLabTest:()=>{},
    calculateTestDiscount:()=> {}
}

export const TestBookingContext = createContext(defaultTest);