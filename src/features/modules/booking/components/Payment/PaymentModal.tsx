import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import PaymentSelect from "./PaymentSelect"
import { useContext, useState } from "react"
import { BsCashCoin } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PathoContext } from "../../contexts/PathoContext";
import { PaymentTypeSchema } from "../../data/schema";
import { ErrorToast } from "../../utils/error-response";





function PaymentNullScreen(){
    return(
        <div className="w-full h-full flex justify-center items-center">
            <h1>No Payment method selected</h1>
        </div>
    )
}

function PaymentCash(){
    return(
        <>
            <BsCashCoin size={45} className="text-green-400" />
        </>
    )
}

function DebitPayment(){
    return(
        <div className="grid grid-rows-1 gap-5">
            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">TID:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter TID no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Card No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Card no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Transaction No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Transaction no"
                />
            </div>
        </div>
    )
}

function CreditPayment(){
    return(
        <div className="grid grid-rows-1 gap-5">
            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">TID:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter TID no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Card No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Card no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Transaction No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Transaction no"
                />
            </div>
        </div>
    )
}

function PaymentMethodSelected(){
    const {paymentMethod} = useContext(PathoContext);
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


function PayAndBookMethodDetails(){

    const {totalAmount,discountAmount,discountedAmount,discountDetail,netAmount} = useContext(PathoContext);
    const [dueAmount,setDueAmount] = useState<number>(0);
    const [recievingAmount,setRecievingAmount] = useState<string>("");
    const [amountToBePaid,setAmountToBePaid] = useState<number>(netAmount);


    const handlePaymentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRecievingAmount(e.target.value);
        if(e.target.value == ''){
            setRecievingAmount('');
            setDueAmount(0)
            setAmountToBePaid(discountedAmount);
            return;
        }
        if(Number(e.target.value) > netAmount){
            setRecievingAmount('');
            setDueAmount(0);
            setAmountToBePaid(netAmount);
            ErrorToast.launchErrorToast("Amount limit exceded");
            return;
        }

        const remainingAmountToBePaid = netAmount - Number(e.target.value);
        console.log(remainingAmountToBePaid);
        setDueAmount(remainingAmountToBePaid);
        setAmountToBePaid(Number(e.target.value));
    }


    return(
        <>
            <div className="mb-3 px-2">
                <h1 className="font-bold underline underline-offset-2">Payment Details</h1>
            </div>
            <div className="px-6 grid grid-rows-1 gap-4">
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Total Amount</div>
                    <div className="text-right  font-semibold">{totalAmount > 0 ? totalAmount.toFixed(2) :  '0.00'}</div>
                </div>
                {
                    discountDetail != '' && (
                        <>
                            <div className="grid grid-cols-[200px_1fr]">
                                <div className="font-medium">Discount Amount</div>
                                <div className="text-right  font-semibold">{discountAmount.toFixed(2) ?? '0.00'}</div>
                            </div>
                            <div className="grid grid-cols-[200px_1fr]">
                                <div className="font-medium">Discounted Amount</div>
                                <div className="text-right  font-semibold">{discountedAmount > 0 ? discountedAmount.toFixed(2) :  '0.00'}</div>
                            </div>
                        </>
                    )
                }
                
                <div className="grid grid-cols-[180px_1fr]">
                    <div className="font-medium">Receiving Amount</div>
                    <div className="text-right border-[1px] rounded border-gray-700 font-semibold">
                        <input type="number" value={recievingAmount} onChange={(e)=> handlePaymentChange(e)} className="border-0 text-right px-1 py-2 pr-3 placeholder:text-[11px] outline-0 ring-0 h-full w-full" placeholder="Enter recieving amount" />
                    </div>
                </div>
                <div className="grid grid-cols-[200px_1fr]">
                    <div className="font-medium">Due Amount ({new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:'2-digit'})}) </div>
                    <div className="text-right  font-semibold">{dueAmount > 0 ? dueAmount.toFixed(2) :  '0.00'}</div>
                </div>
                <div className="grid grid-cols-[200px_1fr] border-t-2 border-b-2 py-2 border-dashed border-gray-500">
                    <div className="font-medium">Amount Paid</div>
                    <div className="text-right  font-semibold">{amountToBePaid > 0 ? amountToBePaid.toFixed(2) :  '0.00'}</div>
                </div>
            </div>
        </>
      
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
                            <PayAndBookMethodDetails/>
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