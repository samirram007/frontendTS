import { DiscountDetail } from "../DiscountFeature/discount-details";
import { usePayment } from "../../../../contexts/payment-context";

export function PaymentDetail({ }) {


    const {totalAmount,netAmount,discountedAmount,dueAmount} = usePayment();



    return (
        <>
            <div className="px-1">
                <div className="grid py-2 grid-cols-2 text-app-base">
                    <div className="font-medium">
                        Total Amount
                    </div>
                    <div className="px-4 font-medium text-right">
                        {totalAmount == 0 ? '0.00' : totalAmount.toFixed(2)}
                    </div>
                </div>
                {
                    discountedAmount != 0 && <DiscountDetail />
                }


                <div className="grid py-2 mt-3 text-app-base border-t-1 border-b-1 border-dashed border-gray-500 grid-cols-2">
                    <div className="font-medium">
                        Net Amount
                    </div>
                    <div className="px-4 font-bold text-right">
                        {netAmount.toFixed(2)}
                    </div>
                </div>

                {
                    dueAmount > 0 &&
                    <div className="grid py-4 pt-6 grid-cols-2">
                        <div>
                            <h3>Dues</h3>
                        </div>
                        <div className="border-l-2 pl-2 ">
                            {dueAmount == 0 ? '0.00' : dueAmount.toFixed(2)}
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
