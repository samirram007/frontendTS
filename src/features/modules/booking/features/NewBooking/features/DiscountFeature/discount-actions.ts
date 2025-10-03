import type { DiscountType } from "@/features/modules/booking/data/schema";






function calculateDiscount(discountType:DiscountType,discountVal:number,totalAmount:number): number{
    if(discountType == "percentage"){
        const percentVal:number = Number(discountVal)/100;
        const discountPrice = percentVal * totalAmount;
        return discountPrice;        
    }
    return discountVal;
}


export {calculateDiscount};