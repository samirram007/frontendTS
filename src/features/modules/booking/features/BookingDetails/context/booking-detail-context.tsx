import React, { useEffect, useState } from "react";
import type { IBooking } from "../../NewBooking/data/schema";


interface IBookingDetailContext{
    bookingDetail:IBooking | null,
    setBookingDetail: React.Dispatch<React.SetStateAction<IBooking | null>>;
    isMinimumPaymentDone: boolean,
    setIsMinimumPaymentDone: React.Dispatch<React.SetStateAction<boolean>>;
    isFullPaymentDone: boolean,
    setIsFullPaymentDone: React.Dispatch<React.SetStateAction<boolean>>;

}

const BookingDetailContext = React.createContext<IBookingDetailContext | null>(null);



export default function BookingDetailProvider({children}:{children: React.ReactNode}){

    const [bookingDetail,setBookingDetail] = useState<IBooking | null>(null);
    const [isMinimumPaymentDone,setIsMinimumPaymentDone] = useState<boolean>(false);
    const [isFullPaymentDone,setIsFullPaymentDone] = useState<boolean>(false);

    useEffect(()=>{
        if(bookingDetail){
            const totalCredit = bookingDetail?.voucherEntries?.reduce(
                (sum, entry) => sum + Number(entry.credit ?? 0),
                0
            );
            const duedataAmount = bookingDetail?.voucherReferences?.reduce((sum, ref) => {
                const entries = ref?.voucher?.voucherEntries ?? [];
                const voucherCredit = entries.reduce(
                (innerSum, entry) => innerSum + Number(entry.credit ?? 0),
                0
                );
                return sum + voucherCredit;
            }, 0);

            const discountEntry = bookingDetail?.voucherEntries?.find(
                (entry) =>
                    entry.accountLedger.code?.toLowerCase() == 'discalw' ||
                    entry.accountLedger.name?.toLowerCase() == 'discount allowed'
            );

            const discountedAmount = discountEntry ? Number(discountEntry.debit ?? 0) : 0;
            const amountTotal = totalCredit - discountedAmount;

            const half = amountTotal / 2;
            if(duedataAmount && duedataAmount == amountTotal){
                setIsFullPaymentDone(true);
                setIsMinimumPaymentDone(true);
            }
            else if(duedataAmount && duedataAmount >= half){
                setIsMinimumPaymentDone(true);
                setIsFullPaymentDone(false);
            }

        }
    },[bookingDetail]);

    return(
        <BookingDetailContext.Provider value={{
            bookingDetail,setBookingDetail,
            isFullPaymentDone,setIsFullPaymentDone,
            isMinimumPaymentDone,setIsMinimumPaymentDone
        }}>
            {children}
        </BookingDetailContext.Provider>
    )
}

export const useBookingDetail = () =>{
    const bookingDetailContext = React.useContext(BookingDetailContext);
    if(!bookingDetailContext){
        throw new Error("useBookingDetal has to be inside BookingDetailProvider");
    }

    return bookingDetailContext;
}