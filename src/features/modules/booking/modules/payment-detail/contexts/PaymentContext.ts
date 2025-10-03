import { createContext } from "react";



interface IPaymentDetailInterface{
    totalAmount: number | null;
    setTotalAmount: React.Dispatch<React.SetStateAction<number | null>>;
    discountAmount: number | null;
    setDiscountAmount: React.Dispatch<React.SetStateAction<number | null>>;
    discountedAmount: number | null;
    setDiscountedAmount: React.Dispatch<React.SetStateAction<number | null>>;
    netAmount: number | null;
    setNetAmount: React.Dispatch<React.SetStateAction<number | null>>;
}

const PaymentDefault: IPaymentDetailInterface ={
    totalAmount: 0,
    setTotalAmount: function (): void {
        throw new Error("Function not implemented.");
    },
    discountAmount: 0,
    setDiscountAmount: function (): void {
        throw new Error("Function not implemented.");
    },
    discountedAmount: 0,
    setDiscountedAmount: function (): void {
        throw new Error("Function not implemented.");
    },
    netAmount: 0,
    setNetAmount: function (): void {
        throw new Error("Function not implemented.");
    }
}


export const PaymentContext = createContext<IPaymentDetailInterface>(PaymentDefault);