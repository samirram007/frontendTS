import { useContext, useState } from "react"
import { TestBookingContext } from "./TestBookingContext"
import { PathoContext } from "../PathoContext";
import type { DiscountType, ITestItem } from "../../data/schema";
import { calculateDiscount } from "../../features/DiscountFeature/utils/calculate-discount";





export const TestBookingProvider = ({children}:{children:any}) =>{

    const [selectedLabTest,setSelectedLabTest] = useState<ITestItem[]>([]);
    const {totalAmount,discountDetail,setDiscountAmount} = useContext(PathoContext);

    const calculateTestDiscount = () =>{
        const discountType = discountDetail.split(',')[0];
        const discountVal = discountDetail.split(',')[1];
        const discountValue = calculateDiscount(discountType as DiscountType,Number(discountVal),totalAmount);
        setDiscountAmount(discountValue);
    }

    return(
        <TestBookingContext.Provider value={{
            selectedLabTest,setSelectedLabTest,calculateTestDiscount
        }}>
            {children}
        </TestBookingContext.Provider>
    )
}