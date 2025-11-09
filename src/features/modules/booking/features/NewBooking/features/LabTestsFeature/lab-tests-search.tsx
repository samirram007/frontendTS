import { useEffect, useRef, useState } from "react";
import { useGetAgentListQuery } from "./data/queryOptions";
import type { ILabTestItem, ITestItem } from "./data/schema";
import { useLabTestItem } from "./context/lab-test-context";
import { toast } from "sonner";
import { usePayment } from "../../../../contexts/payment-context";
import { useBookingTest } from "../../context/new-booking-context";
import { calculateDiscount, calculateDiscountPercent, calculateDiscountRate } from "../DiscountFeature/discount-actions";







const LabTestSearch = () => {

    const { data, isSuccess } = useGetAgentListQuery();
    const { discountTypeId, setDiscountTypeId } = useBookingTest();
    const { setLabTestItemList, labTestItemList, setSelectTestItemList, selectTestItemList } = useLabTestItem();
    const { setTotalAmount, setNetAmount, selectedDiscount, setDiscountRate, setDiscountedAmount } = usePayment();
    const totalAmountRef = useRef<number>(0);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);

    const [query, setQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setLabTestItemList(data.data.data);
        }
    }, [isSuccess, data]);



    const handleLabSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowDropdown(true);
        setHighlightIndex(-1);
    }

    // getting all ids of selected test items and filtering them out
    const allIds = Array.from(selectTestItemList.map((item) => item.testId));
    const filteredLabTestList = labTestItemList?.filter((item) => !allIds.includes(item.id))?.filter((lab) =>
        lab.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelectTest = (test: ILabTestItem) => {
        setShowDropdown(false);
        const isMatch = selectTestItemList.some((item) => item.testId == test.id);
        if (isMatch) {
            return toast.error("Test already selected");
        }
        const testObj: ITestItem = {
            testId: test.id,
            name: test.printName,
            testDate: new Date(),
            reportDate: new Date(),
            amount: test.standardSellingPrice,
            status: "active"
        }
        setSelectTestItemList([...selectTestItemList, testObj]);
        setQuery("");
        totalAmountRef.current = totalAmountRef.current + Number(test.standardSellingPrice);
        // amount calculation
        setTotalAmount((prev) => prev + Number(test.standardSellingPrice));
        setNetAmount((prev) => prev + Number(test.standardSellingPrice));


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
                setDiscountRate(100);
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || filteredLabTestList.length == 0) return;

        if (e.key == "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => prev < filteredLabTestList.length - 1 ? prev + 1 : 0);
        } else if (e.key == "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) => prev > 0 ? prev - 1 : filteredLabTestList.length - 1);
        } else if (e.key == "Enter") {
            e.preventDefault();
            if (highlightIndex >= 0) {
                handleSelectTest(filteredLabTestList[highlightIndex]);
            }
        } else if (e.key == "Escape") {
            e.preventDefault();
            setShowDropdown(false);
        }
    }


    return (
        <div className="w-full grid grid-cols-[100px_1fr] items-center">
            <div className="font-bold">Test Select</div>
            <div className="relative">
                <input
                    type="search"
                    id="agent_search"
                    name="agent_search"
                    placeholder="Search Lab tests"
                    value={query}
                    autoComplete="off"
                    onChange={(e) => handleLabSearch(e)}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    className="w-3/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none"
                />

                {showDropdown && query && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
                        {filteredLabTestList.length > 0 ? (
                            filteredLabTestList.map((labtest) => (
                                <div
                                    key={labtest.id}
                                    className="px-3 py-2 hover:bg-emerald-100 cursor-pointer border-b-1 border-gray-600"
                                    onClick={() => handleSelectTest(labtest)}
                                >
                                    <div className="font-medium">{labtest.printName}</div>
                                    <div className="text-sm text-slate-500">
                                        ID: {labtest.code} | Price: {labtest.mrp}
                                    </div>
                                    <div className="text-xs text-slate-400">{labtest.sku}</div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-slate-500">
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}


export default LabTestSearch;