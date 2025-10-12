import { useEffect, useState } from "react";
import { useGetAgentListQuery } from "./data/queryOptions";
import type { ILabTestItem, ITestItem } from "./data/schema";
import { useLabTestItem } from "./context/lab-test-context";
import { toast } from "sonner";
import { usePayment } from "../../../../contexts/payment-context";







const LabTestSearch = () => {

    const {data,isSuccess} = useGetAgentListQuery();

    const {setLabTestItemList,labTestItemList,setSelectTestItemList,selectTestItemList} = useLabTestItem();
    const {setTotalAmount,setNetAmount} = usePayment();

    const [query,setQuery] = useState<string>("");
    const [showDropdown,setShowDropdown] = useState<boolean>(false);

    useEffect(()=>{
        if(isSuccess){
            setLabTestItemList(data.data.data);
        }
    },[isSuccess,data]);
    


    const handleLabSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value);
        if(e.target.value == ""){
            
        }
    }

    // getting all ids of selected test items and filtering them out
    const allIds =  Array.from(selectTestItemList.map((item)=> item.testId));
    const filteredLabTestList = labTestItemList?.filter((item)=> !allIds.includes(item.id))?.filter((lab)=>
        lab.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelectTest = (test: ILabTestItem) =>{
        setShowDropdown(false);
        const isMatch = selectTestItemList.some((item)=> item.testId == test.id);
        if(isMatch){
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
        setSelectTestItemList([...selectTestItemList,testObj]);
        setQuery("");
        // amount calculation
        setTotalAmount((prev)=> prev + Number(test.standardSellingPrice));
        setNetAmount((prev)=> prev + Number(test.standardSellingPrice));
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
                    className="w-3/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none"
                />

                {showDropdown && query && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
                        {filteredLabTestList.length > 0 ? (
                            filteredLabTestList.map((labtest) => (
                                <div
                                    key={labtest.id}
                                    className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
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