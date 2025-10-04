import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaymentTypeSchema } from "@/features/modules/booking/data/schema";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";

interface IPaymentSelectInterface{
    className?:string
}




export default function PaymentSelect({className}:IPaymentSelectInterface){
    const {setPaymentMethod} = usePayment();

    return(
        <div className="py-2 my-1">
            <Select onValueChange={(e)=>{
                setPaymentMethod(e as PaymentTypeSchema);
            }} defaultValue={PaymentTypeSchema.CASH}>
                <SelectTrigger className={className ? className :"w-full"}>
                    <SelectValue className="!text-app-small" placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Object.values(PaymentTypeSchema).map((item,index)=>(
                            <SelectItem className="!text-app-small" key={index} value={item}>{item}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}