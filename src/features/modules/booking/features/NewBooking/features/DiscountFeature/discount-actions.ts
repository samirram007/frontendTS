





function calculateDiscount(discountPercentage:string,discountVal:number,totalAmount:number): number{
    if(discountPercentage == 'true'){
        const percentVal:number = Number(discountVal)/100;
        const discountPrice = percentVal * totalAmount;
        const discountedPrice = totalAmount - discountPrice;
        return discountedPrice;        
    }else{
        if(discountVal > totalAmount){
            return -1;
        }
        const discountedPrice = totalAmount - discountVal;
        return discountedPrice;
    }
}
function calculateDiscountPercent(discountVal:number,totalAmount:number): number{
    const percentVal:number = Number(discountVal)/100;
    const discountPrice = percentVal * totalAmount;
    return discountPrice;        
}
function calculateDiscountRate(discountVal:number,totalAmount:number): number{
    const discountRate:number = (Number(discountVal)/totalAmount) * 100;
    return discountRate;        
}


export {calculateDiscount,calculateDiscountPercent,calculateDiscountRate};