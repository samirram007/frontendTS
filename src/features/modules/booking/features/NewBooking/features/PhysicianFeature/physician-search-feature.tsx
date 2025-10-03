import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import PhysicianForm from "./create-physician-feature";
import { useGetPhysicianListQuery } from "./data/queryOptions";
import { usePhysician } from "./context/physician-context";
import type { IPhysician } from "./data/schema";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import type { IPatient } from "../CreatePatientFeature/data/schema";




const PhysicianSearchFeature = () => {

    const {data,isSuccess} = useGetPhysicianListQuery();
    console.log("physician data",data?.data.data);

    const {setPhysicianDetail} = usePhysician();
    const {setPatient} = usePatient();
    const [query, setQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [physicianData,setPhysicianData] = useState<IPhysician[]>([]);

    useEffect(()=>{
        if(isSuccess){
            setPhysicianData(data.data.data);
        }
    },[isSuccess,data]);

    const filteredPatients = physicianData.filter(
        (p) =>
            p.degree?.toLowerCase().includes(query.toLowerCase()) ||
            p.name?.includes(query) ||
            p.contactNo?.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (pyhsician: IPhysician) => {
        setPhysicianDetail(pyhsician);
        setPatient((prev)=>{
            return prev ?
                {
                    ...prev,
                    physician: pyhsician,
                }
                :
                {physician: pyhsician
                 } as IPatient;
        });
        setQuery(pyhsician.name);
        setShowDropdown(false);
    };
    return (
        <>
            <div className="relative w-full grid grid-cols-[1fr_30px] focus-within:border-1 focus-within:border-blue-500 items-center border-1 rounded focus:border-emerald-600 ">
                <input
                    type="search"
                    id="appointment_search"
                    name="appointment_search"
                    placeholder="Search existing Patient by name, phone, or ID..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value == '') {
                            setPhysicianDetail(null);
                        }
                        setShowDropdown(true); // open dropdown when typing
                    }}
                    onFocus={() => query && setShowDropdown(true)} // open dropdown on focus if query exists
                    className="w-full px-3 py-1 border-none shadow-none placeholder:text-[12px] outline-none"
                />
                <Search size={16} className="cursor-pointer" />
                {showDropdown && query && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((pyhsician) => (
                                <div
                                    key={pyhsician.id}
                                    className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                                    onClick={() => handleSelect(pyhsician)}
                                >
                                    <div className="font-medium">{pyhsician.name}</div>
                                    <div className="text-sm text-slate-500">
                                        ID: {pyhsician.id} | Phone: {pyhsician.contactNo}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-slate-500">
                                <PhysicianForm 
                                    button={<span className="text-sm text-blue-500 cursor-pointer">Create Pyhsician</span>}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}



export default PhysicianSearchFeature;