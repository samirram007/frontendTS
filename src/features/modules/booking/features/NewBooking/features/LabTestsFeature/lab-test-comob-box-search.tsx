import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLabTestItem } from "./context/lab-test-context";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";
import { useBookingTest } from "../../context/new-booking-context";
import { useGetAgentListQuery } from "./data/queryOptions";
import { toast } from "sonner";
import type { ITestItem } from "./data/schema";
import { calculateDiscount, calculateDiscountPercent, calculateDiscountRate } from "../DiscountFeature/discount-actions";




interface ILabTestOption {
    label: string,
    value: string
}




const LabTestComboBoxSearch = () => {
    const { data, isSuccess } = useGetAgentListQuery();
    const { discountTypeId, setDiscountTypeId } = useBookingTest();
    const { setSelectTestItemList, selectTestItemList, setLabTestItemList, labTestItemList } = useLabTestItem();
    const { setTotalAmount, setNetAmount, selectedDiscount, setDiscountRate, setDiscountedAmount } = usePayment();
    const totalAmountRef = useRef<number>(0);
    const [testItemList, setTestItemList] = useState<ILabTestOption[]>([]);
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("");


    useEffect(() => {
        if (isSuccess && data) {
            const labtestArr: ILabTestOption[] = [];
            data.data.data.forEach((testItem) => {
                const labTestObj: ILabTestOption = {
                    label: testItem.name,
                    value: `${testItem.id}`
                };
                labtestArr.push(labTestObj);
            });
            setTestItemList(labtestArr);
            setLabTestItemList(data.data.data);
        }
    }, [data, isSuccess]);

    // const allIds =  Array.from(selectTestItemList.map((item)=> item.testId));
    // const filteredLabTestList = labTestItemList?.filter((item)=> !allIds.includes(item.id))?.filter((lab)=>
    //     lab.label.toLowerCase().includes(query.toLowerCase())
    // );


    const handleSelectTest = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        if (isSuccess && labTestItemList) {
            const test = labTestItemList.find((item) => item.id === Number(currentValue));

            if (!test) {
                return toast.error("Test not found");
            }

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


    }


    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="grid grid-cols-[100px_1fr] items-center">
                    <div>
                        <Label className="font-bold text-[13px]">
                            Test Select
                        </Label>
                    </div>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-sm justify-between"
                        >
                            {value
                                ? testItemList.find((testItem) => testItem.value === value)?.label
                                : "Select Lab Test..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                </div>

                <PopoverContent className="w-sm p-0">
                    <Command>
                        <CommandInput placeholder="Search Lab Test..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Lab Test found.</CommandEmpty>
                            <CommandGroup>
                                {testItemList.map((testItem) => (
                                    <CommandItem
                                        key={testItem.value}
                                        value={testItem.value}
                                        onSelect={(currentValue) => handleSelectTest(currentValue)}
                                    >
                                        {testItem.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === testItem.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}


export default LabTestComboBoxSearch;