import React, { useState } from 'react';
import { PaymentTypeSchema } from '../features/NewBooking/features/PaymentFeature/data/schema';
import type { IBooking } from '../features/NewBooking/data/schema';


type PaymentReceipt = {
    date: string,
    amount: number
}



interface PaymentContextType {
    totalAmount: number;
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    netAmount: number;
    setNetAmount: React.Dispatch<React.SetStateAction<number>>;
    discountedAmount: number;
    setDiscountedAmount: React.Dispatch<React.SetStateAction<number>>;
    paymentMethod: PaymentTypeSchema | null;
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentTypeSchema | null>>;
    calculateTotalAmount: (data?: IBooking) => void,
    receivingAmount: string,
    setReceivingAmount: React.Dispatch<React.SetStateAction<string>>;
    // due amount place to register the amount which is to be paid
    dueAmount: number,
    setDueAmount: React.Dispatch<React.SetStateAction<number>>;
    payementReceipt: PaymentReceipt[],
    setPaymentReceipt: React.Dispatch<React.SetStateAction<PaymentReceipt[]>>;

    // discount details
    discountValue: string;
    setDiscountValue: React.Dispatch<React.SetStateAction<string>>;
    selectedDiscount: string;
    setSelectedDiscount: React.Dispatch<React.SetStateAction<string>>;
    discountRate: number,
    setDiscountRate: React.Dispatch<React.SetStateAction<number>>;
}



const PaymentContext = React.createContext<PaymentContextType | null>(null);


export default function PaymentProvider({ children }: { children: React.ReactNode }) {

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [netAmount, setNetAmount] = useState<number>(0);
    const [discountValue, setDiscountValue] = useState<string>("");
    const [discountedAmount, setDiscountedAmount] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentTypeSchema | null>(PaymentTypeSchema.CASH);
    const [receivingAmount, setReceivingAmount] = useState<string>('');
    const [dueAmount, setDueAmount] = useState<number>(0);
    const [payementReceipt, setPaymentReceipt] = useState<PaymentReceipt[]>([]);
    const [selectedDiscount, setSelectedDiscount] = useState<string>("none");
    const [discountRate, setDiscountRate] = useState<number>(100);


    const calculateTotalAmount = (data?: IBooking) => {
        if (!data) return;
        const totalCredit = data?.voucherEntries?.reduce(
            (sum, entry) => sum + Number(entry.credit ?? 0),
            0
        );

        // const discountEntry = data?.voucherEntries?.find(
        //     (entry) =>
        //         entry.accountLedger.code?.toLowerCase() == 'discalw' ||
        //         entry.accountLedger.name?.toLowerCase() == 'discount allowed'
        // );

        const discountedAmount = data?.stockJournal.stockJournalEntries.reduce((sum, item) => sum + Number(item.discountValue ?? 0), 0);

        setTotalAmount(totalCredit);
        setDiscountedAmount(discountedAmount);

        const discountDue = totalCredit - discountedAmount;
        calculateDueAmount(discountDue, data);
        setNetAmount(discountDue);
    }


    function calculateDueAmount(totalAmount: number, data?: IBooking) {
        let payreceipt: PaymentReceipt[] = [];
        const duedataAmount = data?.voucherReferences?.reduce((sum, ref) => {
            const entries = ref?.voucher?.voucherEntries ?? [];
            const voucherCredit = entries.reduce(
                (innerSum, entry) => innerSum + Number(entry.credit ?? 0),
                0
            );
            payreceipt.push({
                date: ref.voucher.voucherDate,
                amount: voucherCredit
            });
            return sum + voucherCredit;
        }, 0);
        if (duedataAmount != 0 && duedataAmount != undefined) {
            const dues = totalAmount - duedataAmount;
            setDueAmount(dues);
            setNetAmount(dues);
            setPaymentReceipt(payreceipt);
        } else {
            setNetAmount(totalAmount);
        }
    }



    return (
        <PaymentContext.Provider value={{
            totalAmount, setTotalAmount,
            netAmount, setNetAmount,
            discountedAmount, setDiscountedAmount,
            paymentMethod, setPaymentMethod,
            calculateTotalAmount,
            receivingAmount, setReceivingAmount,
            dueAmount, setDueAmount,
            payementReceipt, setPaymentReceipt,
            discountValue, setDiscountValue,
            selectedDiscount, setSelectedDiscount,
            discountRate, setDiscountRate
        }}>
            {children}
        </PaymentContext.Provider>
    )
}


export const usePayment = () => {
    const paymentContext = React.useContext(PaymentContext);

    if (!paymentContext) {
        throw new Error("usePayment has to be used within <PaymentContext>");
    }

    return paymentContext;
}