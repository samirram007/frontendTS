import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllDiscountTypes } from "./data/queryOptions";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import { useBookingTest } from "../../context/new-booking-context";
import { calculateDiscount, calculateDiscountPercent, calculateDiscountRate } from "./discount-actions";
import { toast } from "sonner";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import { useEffect } from "react";
import { useLabTestItem } from "../LabTestsFeature/context/lab-test-context";




const DiscountSelect = ({ className, disabled }: { className?: string, disabled?: boolean }) => {

    const { patient } = usePatient();
    const { data, isLoading, } = useGetAllDiscountTypes();
    const { setDiscountTypeId } = useBookingTest();
    const { setItemDiscountPercent, setItemDiscountValue } = useLabTestItem();

    const { setDiscountedAmount, setNetAmount, totalAmount, selectedDiscount, setSelectedDiscount, setDiscountRate } = usePayment();

    useEffect(() => {
        if (patient?.discountTypeId && data?.data.data.length) {
            setDiscountTypeId(patient?.discountTypeId);
            const selectedDiscount = data?.data.data.find((item) =>
                item.id === patient.discountTypeId);
            if (selectedDiscount) {
                const discountStr = `${selectedDiscount.isPercentage},${selectedDiscount.value},${selectedDiscount.id}`;
                setSelectedDiscount(discountStr);
                handleDiscount(discountStr);
            }
        } else {
            // setSelectedDiscount("none");
        }
    }, [patient?.discountTypeId, data?.data.data]);


    const handleDiscount = (e: string) => {
        setSelectedDiscount(e);
        if (e == "none") {
            setNetAmount(totalAmount);
            setDiscountTypeId(1);
            return;
        }
        const isPercent = e.split(',')[0];
        const value = e.split(',')[1];
        const discountId = e.split(',')[2];

        if (isPercent === "true") {
            const amount = calculateDiscountPercent(Number(value), totalAmount);
            setDiscountedAmount(amount);
            setDiscountRate(Number(value));
            setItemDiscountPercent(Number(value));
        } else {
            const rate = calculateDiscountRate(Number(value), totalAmount);
            setDiscountRate(rate);
            setDiscountedAmount(Number(value));
            setItemDiscountValue(Number(value));
        }


        const discountedTotalAmount: number = calculateDiscount(isPercent, Number(value), totalAmount);
        if (discountedTotalAmount == -1) {
            setNetAmount(totalAmount);
            setDiscountTypeId(1);
            // setSelectedDiscount("none");
            toast.error("Discount not applied");
            return
        } else {
            setNetAmount(discountedTotalAmount);
            setDiscountTypeId(Number(discountId));
        }

    }


    return (
        <>
            <Select disabled={disabled} value={selectedDiscount} onValueChange={(e) => handleDiscount(e)}>
                <SelectTrigger className={`${className ? className : 'w-full'}`}>
                    <SelectValue placeholder="Select a Discount" />
                </SelectTrigger>
                <SelectContent>
                    {
                        isLoading ?
                            <div>
                                <span className="text-sm text-center">Loading....</span>
                            </div>
                            :
                            data?.data.data?.map((item, index) => (
                                <SelectItem key={index} value={`${item.isPercentage},${item.value},${item.id}`}>
                                    {item.name}{' '}{`${item.isPercentage ? `${item.value} %` : `${item.value}`}`}
                                </SelectItem>
                            ))
                    }
                </SelectContent>
            </Select>
        </>
    )
}


export default DiscountSelect;