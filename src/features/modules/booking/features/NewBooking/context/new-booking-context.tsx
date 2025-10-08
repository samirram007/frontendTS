import React, { useState } from "react";
import type { IBookingResponse } from "../data/schema";




interface BookingDataContextType{
    bookingData: IBookingResponse | null;
    setBookingData: React.Dispatch<React.SetStateAction<IBookingResponse | null>>;
}



const BookingDataContext = React.createContext<BookingDataContextType | null>(null);


export default function BookingDataProvider({children}:{children: React.ReactNode}){

    const [bookingData,setBookingData] = useState<IBookingResponse | null>(null);

    return(
        <BookingDataContext.Provider value={{
            bookingData,setBookingData
        }}>
            {children}
        </BookingDataContext.Provider>
    )
}


export const useBookingTest = () =>{
    const bookingDataContext = React.useContext(BookingDataContext);

    if(!bookingDataContext){
        throw new Error("useBookingTest has to be used within <BookingDataContext>");
    }

    return bookingDataContext;
}