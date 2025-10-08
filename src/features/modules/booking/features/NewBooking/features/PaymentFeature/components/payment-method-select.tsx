import PaymentCash from "./payement-method-select-cash";
import DebitPayment from "./payment-method-select-debit";
import CreditPayment from "./payment-method-select-credit";
import { usePayment } from "../context/payment-context";
import { PaymentTypeSchema } from "../data/schema";



export default function PaymentMethodSelected(){
    const {paymentMethod} = usePayment();
    if(paymentMethod == PaymentTypeSchema.CASH){
        return <PaymentCash/>
    }
    if(paymentMethod == PaymentTypeSchema.DEBIT_CARD.valueOf()){
        return <DebitPayment/>
    }
    if(paymentMethod == PaymentTypeSchema.CREDIT_CARD.valueOf()){
        return <CreditPayment/>
    }
    if(paymentMethod == PaymentTypeSchema.UPI){
        return(
            <>
                <div className="flex justify-center gap-4 text-center">
                <div className="font-bold">UPI Id:</div>
                <div className="font-semibold">path1234@paytm</div>
            </div>
            <div className="flex justify-center">
                <img src="/upiqr.jpg" alt="" className="h-32 w-32"  />
            </div>
            </>
           
        )
    }
    return null
}
