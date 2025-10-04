import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentSelect from "./PaymentSelect"
import { useContext } from "react"
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PathoContext } from "@/features/modules/booking/contexts/PathoContext";
import { PaymentTypeSchema } from "@/features/modules/booking/data/schema";
import BookingAmountDetails from "./booking-amount-details";
import PaymentMethodSelected from "./payment-method-select";








function PaymentNullScreen(){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <h1>No Payment method selected</h1>
        </div>
    )
}










export const PayAndBookModal = ({button}:{button:any}) =>{

    const {paymentMethod,setPaymentMethod,setAmountToBePaid,discountedAmount} = useContext(PathoContext);

    return(
        <>
            <Dialog onOpenChange={()=>{
                setPaymentMethod(PaymentTypeSchema.CASH);
                setAmountToBePaid(discountedAmount);
            }}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>
                <DialogContent className="sm:max-w-6/12 min-h-5/12">
                    <DialogHeader>
                        <DialogTitle>Please Select your payment Method!</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2">
                        <div className="pr-4s">
                            <h1 className="text-app-base pl-1 font-medium">Select Mode</h1>
                            <PaymentSelect className="w-full text-app-small"/>
                            <div className={`min-h-[20vh] py-4 ${paymentMethod == null || paymentMethod == PaymentTypeSchema.CASH ? 'flex justify-center items-center' : ''}`}>
                                {
                                    paymentMethod == null ?
                                    <PaymentNullScreen/>
                                    :
                                    <PaymentMethodSelected />
                                }
                            </div>
                        </div>
                        <div>
                            <BookingAmountDetails/>
                        </div>
                    </div>
                    <div className="justify-end flex">
                        <Link to="/">
                            <Button className="!bg-green-500 cursor-pointer">
                                Accept Payment
                            </Button>
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}