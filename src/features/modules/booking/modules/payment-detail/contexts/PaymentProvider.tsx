import { useState } from "react"
import { PaymentContext } from "./PaymentContext"




export const PaymentProvider = ({children}:{children:any}) =>{

    const [totalAmount,setTotalAmount] = useState<number | null>(0);
    const [discountAmount,setDiscountAmount] = useState<number | null>(0);
    const [discountedAmount,setDiscountedAmount] = useState<number | null>(0);
    const [netAmount,setNetAmount] = useState<number | null>(0);


    return(
        <PaymentContext.Provider value={{
            totalAmount,setTotalAmount,
            discountAmount,setDiscountAmount,
            discountedAmount,setDiscountedAmount,
            netAmount,setNetAmount
        }}>
            {children}
        </PaymentContext.Provider>
    )
}