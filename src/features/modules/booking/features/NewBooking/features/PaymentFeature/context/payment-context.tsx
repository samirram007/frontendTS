import React, { useState } from 'react';
import { PaymentTypeSchema } from '../data/schema';



interface PaymentContextType{
    totalAmount: number;
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    netAmount: number;
    setNetAmount: React.Dispatch<React.SetStateAction<number>>;
    discountAmount: number;
    setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
    discountedAmount: number;
    setDiscountedAmount: React.Dispatch<React.SetStateAction<number>>;
    paymentMethod: PaymentTypeSchema | null;
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentTypeSchema | null>>;
    calculateNetAmount:()=> void
}



const PaymentContext = React.createContext<PaymentContextType | null>(null);


export default function PaymentProvider({children}:{children: React.ReactNode}){

    const [totalAmount,setTotalAmount] = useState<number>(0);
    const [netAmount,setNetAmount] = useState<number>(0);
    const [discountAmount,setDiscountAmount] = useState<number>(0);
    const [discountedAmount,setDiscountedAmount] = useState<number>(0);
    const [paymentMethod,setPaymentMethod] = useState<PaymentTypeSchema | null>(PaymentTypeSchema.CASH);


    const calculateNetAmount = ()=>{
        if(discountAmount){
            setNetAmount(totalAmount - discountAmount);
        }
        setNetAmount(totalAmount);
    }

    return(
        <PaymentContext.Provider value={{
            totalAmount,setTotalAmount,
            netAmount,setNetAmount,
            discountAmount,setDiscountAmount,
            discountedAmount,setDiscountedAmount,
            paymentMethod,setPaymentMethod,
            calculateNetAmount
        }}>
            {children}
        </PaymentContext.Provider>
    )
}


export const usePayment = () =>{
    const paymentContext = React.useContext(PaymentContext);

    if(!paymentContext){
        throw new Error("usePayment has to be used within <PaymentContext>");
    }

    return paymentContext;
}