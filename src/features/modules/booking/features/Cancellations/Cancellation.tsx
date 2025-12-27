import { Search, SearchIcon } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetCancelledBookingListQuery } from "./data/queryOptions";
import { CancellationListTable } from "./components/refund-table/page";





const CancellationDashboard = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [_selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [_selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const { data, isSuccess, isFetching } = useGetCancelledBookingListQuery();

    const handleFilterBooking = () => {
        const start = startDate.toLocaleDateString('en-CA');
        const end = endDate.toLocaleDateString('en-CA');
        setSelectedStartDate(start);
        setSelectedEndDate(end);
    }

    return (
        <>
            <div className="w-full grid grid-cols-[1fr_20vw] my-4 py-2 px-2 border-[1px] border-gray-300 rounded">
                <div className="flex gap-2">
                    <label htmlFor="search-patient" className="w-full cursor-pointer flex border-[1px] px-1 pr-2 focus-within::border-2 focus-within:border-blue-500 rounded items-center gap-2">
                        <input type="search"
                            autoComplete="off"
                            className="w-full outline-none border-r-2 h-full border-0 shadow-none px-2 text-sm placeholder:text-[11px]"
                            placeholder="Search Patient....."
                        />
                        <Search size={17} onClick={() => console.log("hello")} className="cursor-pointer" />
                    </label>

                    <div className="flex gap-2">
                        <DatePicker date={startDate} setDate={setStartDate} placeholder="Select start date" />
                        <DatePicker date={endDate} setDate={setEndDate} placeholder="Select end date" />
                        <Button onClick={handleFilterBooking}>
                            <SearchIcon />
                            Filter
                        </Button>
                    </div>
                </div>
            </div>
            <Separator className="border-1 border-gray-500" />
            <CancellationListTable isFetching={isFetching} data={data ? data.data.data : []} isSuccess={isSuccess} />
        </>
    )
}


export default CancellationDashboard;