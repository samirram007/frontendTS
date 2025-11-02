import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useContext, useEffect, useState } from "react";
import { PathoContext } from "../../contexts/PathoContext";
import type { IDiscountSchema } from "../../data/schema";




const DiscountSelect = ({className}:{className?:string}) =>{

    const [loading,setLoading] = useState<boolean>(false);
    const {setDiscountAmount,totalAmount,setDiscountedAmount,setDiscountDetail,setNetAmount} = useContext(PathoContext);
    const [discountData,setDiscountData] = useState<IDiscountSchema[] | null>(null);


    const fetchDiscount = useCallback(async()=>{
        setLoading(true);
        try{
            const res = await fetch('http://localhost:5000/discounts');
            if(!res.ok){
                throw new Error("No discount avaliable");
            }
            const data = await res.json();
            setDiscountData(data);
            setLoading(false);
        }catch(error:unknown){
            setLoading(false);
        }
    },[]);


    useEffect(()=>{
        fetchDiscount();
    },[fetchDiscount]);

    const handleDiscount = (e: string) =>{
        if(e == "none"){
            setDiscountDetail('');
            setDiscountAmount(0);
            setDiscountedAmount(0);
            setNetAmount(totalAmount);
            return;
        }
        setDiscountDetail(e);
        const discountType = e.split(',')[0];
        const discountVal = e.split(',')[1];
        if(discountType === "percentage"){
            const percentVal:number = Number(discountVal)/100;
            const discountPrice = percentVal * totalAmount;
            setDiscountAmount(discountPrice);
            const discountedPrice = totalAmount - discountPrice;
            setDiscountedAmount(discountedPrice);
            setNetAmount(discountedPrice);
        }
        if(discountType === "flat"){
            setDiscountAmount(Number(discountVal));
            setDiscountedAmount(totalAmount - Number(discountVal));
            setNetAmount(totalAmount - Number(discountVal));
        }
    }


    return(
        <>
            <Select onValueChange={(e)=> handleDiscount(e)}>
                <SelectTrigger className={`${className ? className : 'w-full'}`}>
                    <SelectValue placeholder="Discount" className="text-black" />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value="none">None {'0%'}</SelectItem>
                    {
                        loading ? 
                        <div>
                            <span className="text-sm text-center">Loading....</span>
                        </div>
                        :
                        discountData?.map((item,index)=>(
                            <SelectItem key={index} value={`${item.discount_type},${item.value}`}>
                                {item.name}{' '}{`${item.discount_type === "percentage" ? `${item.value} %` : `Flat ${item.value}` }`}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </>
    )
}


export default DiscountSelect;