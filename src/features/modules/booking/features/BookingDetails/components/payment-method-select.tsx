import PaymentCash from "./payement-method-select-cash";
import DebitPayment from "./payment-method-select-debit";
import CreditPayment from "./payment-method-select-credit";
import { PaymentTypeSchema } from "../../NewBooking/features/PaymentFeature/data/schema";
import { usePayment } from "../../../contexts/payment-context";




export default function PaymentMethodSelected() {
    const { paymentMethod, setTransactionNo } = usePayment();
    const handleChangeTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionNo(e.target.value);
    }
    if (paymentMethod == PaymentTypeSchema.CASH) {
        return <PaymentCash />
    }
    if (paymentMethod == PaymentTypeSchema.DEBIT_CARD.valueOf()) {
        return <DebitPayment />
    }
    if (paymentMethod == PaymentTypeSchema.CREDIT_CARD.valueOf()) {
        return <CreditPayment />
    }
    if (paymentMethod == PaymentTypeSchema.UPI) {
        return (
            <>
                <div className="flex flex-col items-start">
                    <h1 className="text-app-small mb-2 font-semibold">Transaction No:</h1>
                    <input
                        type="text"
                        onChange={(e) => handleChangeTransaction(e)}
                        className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2"
                        placeholder="Enter Transaction no"
                    />
                </div>
            </>

        )
    }
    return null
}
