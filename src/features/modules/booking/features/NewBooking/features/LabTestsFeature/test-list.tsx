import { AlertAppDialog } from "../../../../shared/components/AlertAppDialog";
import { MdDeleteOutline } from "react-icons/md";
import { useLabTestItem } from "./context/lab-test-context";
import { usePayment } from "../../../../contexts/payment-context";
import { toast } from "sonner";
import { useBookingTest } from "../../context/new-booking-context";
import { useEffect, useRef } from "react";
import { calculateDiscount, calculateDiscountPercent, calculateDiscountRate } from "../DiscountFeature/discount-actions";







const LabTestList = () => {

    const { selectTestItemList, setSelectTestItemList } = useLabTestItem();
    const { discountTypeId, setDiscountTypeId } = useBookingTest();
    const { totalAmount, setTotalAmount, setNetAmount, discountedAmount, setDiscountRate, setDiscountedAmount, selectedDiscount } = usePayment();
    const totalAmountRef = useRef<number>(totalAmount);

    useEffect(() => {
        totalAmountRef.current = totalAmount;
    }, [totalAmount]);





    // on change of test date reporting date will change
    const handleTestDateChange = (id: number, e: React.HTMLInputTypeAttribute) => {
        const selectedTests = selectTestItemList.map((item) => item.testId == id ? { ...item, testDate: new Date(e) } : item);
        setSelectTestItemList(selectedTests);
    }

    // on report date change
    const handleReportDateChange = (id: number, e: React.HTMLInputTypeAttribute) => {
        const selectedTests = selectTestItemList.map((item) => item.testId == id ? { ...item, reportDate: new Date(e) } : item);
        setSelectTestItemList(selectedTests);
    }

    // on adding or removing lab tests
    const handleMinusTest = (id: number) => {
        const remaningList = selectTestItemList.filter((item) => item.testId != id);
        const amount = selectTestItemList.filter((item) => item.testId == id)[0].amount;
        const remainingAmount = totalAmount - Number(amount);
        setSelectTestItemList(remaningList);
        // if discount amount is greater than total
        if (remainingAmount < discountedAmount) {
            // setSelectedDiscount("none");
            setTotalAmount((prev) => prev - Number(amount));
            setNetAmount(remainingAmount);
            setDiscountRate(100);
            setDiscountedAmount(0);
            setDiscountTypeId(1);
            toast.error("Discount have been denied due to inappropriate amount");
            return;
        }

        // amount calculation
        setTotalAmount((prev) => prev - Number(amount));
        setNetAmount((prev) => prev - Number(amount));

        totalAmountRef.current = totalAmountRef.current - Number(amount);

        // discount calculation
        if (discountTypeId && discountTypeId > 1) {
            const isPercent = selectedDiscount.split(',')[0];
            const value = selectedDiscount.split(',')[1];
            const discountId = selectedDiscount.split(',')[2];

            if (isPercent === "true") {
                const amount = calculateDiscountPercent(Number(value), totalAmountRef.current);
                setDiscountedAmount(amount);
                setDiscountRate(Number(value));
            } else {
                const rate = calculateDiscountRate(Number(value), totalAmountRef.current);
                setDiscountRate(rate);
                setDiscountedAmount(Number(value));
            }

            const discountedTotalAmount: number = calculateDiscount(isPercent, Number(value), totalAmountRef.current);
            if (discountedTotalAmount == -1) {
                setNetAmount(totalAmountRef.current);
                setDiscountTypeId(1);
                // setSelectedDiscount("none");
                toast.error("Discount not applied");
                return
            } else {
                setNetAmount(discountedTotalAmount);
                setDiscountTypeId(Number(discountId));
            }
        }
    }


    const handleDiscountValueChange = (e: React.ChangeEvent<HTMLInputElement>, testId: number) => {
        const { value } = e.target;
        const itemAmount = selectTestItemList.find((item) => item.testId == testId)?.amount;
        const rate = (Number(value) / Number(itemAmount)) * 100;
        const itemTestList = selectTestItemList.map((item) => item.testId == testId ? { ...item, discountedValue: Number(value), rate: rate } : item);
        setSelectTestItemList(itemTestList);
        const totaldiscountedValue = itemTestList.reduce((acc, curr) => {
            return acc + Number(curr.discountedValue);
        }, 0);

        const totalItemValue = itemTestList.reduce((acc, sum) => {
            return acc + Number(sum.amount);
        }, 0);

        const totalNetAmount = totalItemValue - totaldiscountedValue;
        setNetAmount(totalNetAmount);
        setDiscountedAmount(totaldiscountedValue);
        const currentDiscountRate = (totaldiscountedValue / totalItemValue) * 100
        setDiscountRate(currentDiscountRate);
    }


    return (
        <div className="my-5 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
            <div className="grid grid-cols-[60px_1fr_150px_150px_130px_120px_90px] px-3 border-b-1 font-semibold py-2 border-black">
                <div>Sl no.</div>
                <div>Test Name</div>
                <div>Test Date</div>
                <div>Reporting Date</div>
                <div>Discount(INR)</div>
                <div className="text-right pr-2">Amount</div>
                <div className="text-center">Action</div>
            </div>
            <div className={`overflow-auto h-[30vh] ${selectTestItemList.length < 1 ? 'flex justify-center items-center' : ''}`}>
                {
                    selectTestItemList.length > 0 ?
                        selectTestItemList.map((item, index) => (
                            <div key={index} className="text-sm px-3  border-b-[0px] grid grid-cols-[60px_1fr_150px_150px_130px_120px_90px]  items-center">
                                <div className="py-2 px-2">
                                    <h1>{++index}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.name}</h1>
                                </div>
                                <div className="py-2">
                                    <input type="date" onChange={(e) => handleTestDateChange(item.testId, e.target.value)} id="test-date" value={new Date(item.testDate).toISOString().split("T")[0]} />
                                </div>
                                <div className="py-2">
                                    <input type="date" onChange={(e) => handleReportDateChange(item.testId, e.target.value)} id="test-date" value={new Date(item.reportDate).toISOString().split("T")[0]} />
                                </div>
                                <div className="py-2">
                                    <input value={item.discountedValue} onChange={(e) => handleDiscountValueChange(e, item.testId)} className="border-[1px] px-2 border-black w-16" />
                                </div>
                                <div className="border-x-2 border-black">
                                    <h1 className="text-right py-2 pr-2">{Number(item.amount).toFixed(2)}</h1>
                                </div>
                                <div className="flex justify-center items-center gap-3 py-2">
                                    <AlertAppDialog name={
                                        <MdDeleteOutline className="cursor-pointer text-red-500" size={20} />
                                    }
                                        title="Are you absolutely sure?" description="The action cannot be undone"
                                        cancelText="Cancel" submitText="Submit" onSubmit={() => handleMinusTest(item.testId)}
                                    />
                                </div>
                            </div>
                        ))
                        :
                        <div>
                            <h2>No Tests Selected</h2>
                        </div>
                }
            </div>

            <div className="border-t-2 sticky bottom-0 left-0 w-full py-2 bg-gray-100 z-50 border-black grid grid-cols-[60px_1fr_150px_150px_130px_120px_90px]">
                <div className="text-right col-span-5">
                    <h3>Amount</h3>
                </div>
                <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                    {totalAmount == 0 ? '00.00' : totalAmount.toFixed(2)}
                </div>
                <div className="col-span-0"></div>
            </div>

        </div>
    )
}


export default LabTestList;