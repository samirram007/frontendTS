import { useContext } from "react";
import { PathoContext } from "../../../../contexts/PathoContext";


export function DiscountDetail(){

    const {discountAmount,discountedAmount} = useContext(PathoContext);

    return(
        <div>
            <div className="grid py-2 grid-cols-2 text-app-base">
                <div className="font-medium">
                Discount Amount
                </div>
                <div className="px-4 font-medium text-right">
                {Number(discountAmount) == 0 ? '0.00' : Number(discountAmount).toFixed(2)}
                </div>
            </div>

            <div className="grid py-2 grid-cols-2 text-app-base">
                <div className="font-medium">
                Discounted Amount
                </div>
                <div className="px-4 font-medium text-right">
                {Number(discountedAmount) == 0 ? '0.00' : Number(discountedAmount).toFixed(2)}
                </div>
            </div>
        </div>
    )
}
