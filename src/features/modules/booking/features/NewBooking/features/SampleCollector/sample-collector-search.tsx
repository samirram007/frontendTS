import { useEffect, useState } from "react";
import { useGetAllSampleCollectors } from "./data/queryOptions";
import type { ISampleCollector } from "./data/schema";
import { useBookingTest } from "../../context/new-booking-context";





const SampleCollectorSearch = () => {

    const {setSampleCollectorId} = useBookingTest();
    const {data,isSuccess} = useGetAllSampleCollectors();
    const [query,setQuery] = useState<string>("");
    const [showDropdown,setShowDropdown] = useState<boolean>(false);
    const [sampleCollector,setSampleCollector] = useState<ISampleCollector[]>([]);



    useEffect(()=>{
        if(isSuccess && data){
            setSampleCollector(data.data.data);
        }
    },[isSuccess,data]);


    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value);
        setShowDropdown(true);
    }

    const filteredSmapleCollectorList = sampleCollector?.filter((p)=>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.contactNo.includes(query)
    );

    const handleSelectPatient = (collector: ISampleCollector) =>{
        setShowDropdown(false);
        setQuery(collector.name);
        setSampleCollectorId(collector.id);
    }


    return (
        <div className="w-full">
            <div className="grid grid-cols-[70px_1fr] items-center">
                <div>
                    <label htmlFor="sample_collector_search" className="font-bold text-[13px]">
                        Collector
                    </label>
                </div>

                <div className="relative flex items-center gap-4">
                    <input
                        type="search"
                        id="sample_collector_search"
                        name="sample_collector_search"
                        placeholder="Search existing Sample Collector by name, phone, or ID..."
                        value={query}
                        autoComplete="off"
                        onChange={(e) => handleSearch(e)}
                        onFocus={() => query && setShowDropdown(true)}
                        className="w-3/3 px-3 py-2 border rounded-lg outline-none"
                    />

                    {showDropdown && query && (
                        <div
                            tabIndex={0}
                            className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-50 max-h-60 overflow-y-auto"
                        >
                            {filteredSmapleCollectorList?.length > 0 ? (
                                filteredSmapleCollectorList.map((collector) => (
                                    <div
                                        key={collector.id}
                                        className={`px-3 py-2 cursor-pointer border-b-1 border-gray-600`}
                                        onClick={() => handleSelectPatient(collector)}
                                    >
                                        <div className="font-medium">{collector.name}</div>
                                        <div className="text-sm text-slate-500">
                                            ID: {collector.id} | Phone: {collector.contactNo}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-slate-500">
                                  No Sample Collector Found  
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


export default SampleCollectorSearch;