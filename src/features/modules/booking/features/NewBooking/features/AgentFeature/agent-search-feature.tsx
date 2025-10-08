import { Search } from "lucide-react";
import { useEffect, useState } from "react";
// import AgentForm from "./create-agent-feature";
import { useAgent } from "./context/agent-context";
import type { IAgent } from "./data/schema";
import { useGetAgentListQuery } from "./data/queryOptions";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import type { IPatient } from "../CreatePatientFeature/data/schema";
import { useClickOutside } from "@/features/modules/booking/utils/outsideClickHandler";



const AgentSearchFeature = () => {

    // data calling for agent list
    const {data,isSuccess} = useGetAgentListQuery();

    const { setAgentDetail } = useAgent();
    const {setPatient} = usePatient();
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [filterPatient,setFilterPatient] = useState<IAgent[]>([]);

    const dropdownRef = useClickOutside(()=> {setShowDropdown(false); setQuery("")});

    useEffect(()=>{
        if(isSuccess){
            setFilterPatient(data.data.data);
        }
    },[data,isSuccess]);

    const filteredPatients = filterPatient.filter(
        (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.contactNo.toLowerCase().includes(query.toLowerCase())
    );




    const handleSelect = (agent: IAgent) => {
        setAgentDetail(agent);
        setPatient((prev)=>{
            return prev ?
                {
                    ...prev,
                    agent: agent,
                }
                :
                { agent: agent,
                 } as IPatient;
        });
        setQuery("");
        setShowDropdown(false);
    };
    return (
        <>
            <div className="relative w-full grid grid-cols-[1fr_30px] focus-within:border-1 focus-within:border-blue-500 items-center border-1 rounded focus:border-emerald-600 ">
                <input
                    type="search"
                    id="agent_search"
                    name="agent_search"
                    placeholder="Search Agent by name, contact, or ID..."
                    value={query}
                    autoComplete="off"
                    onChange={(e) => {
                        setQuery(e.target.value)
                        if (e.target.value == '') {
                            setAgentDetail(null);
                        }
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full px-3 py-1 border-none shadow-none placeholder:text-[12px]  outline-none"
                />
                <Search size={16} className="cursor-pointer" />
                {showDropdown && query && (
                    <div ref={dropdownRef} className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
                        { filteredPatients.length > 0 ? (
                            filteredPatients.map((agent) => (
                                <div
                                    key={agent.id}
                                    className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                                    onClick={() => handleSelect(agent)}
                                >
                                    <div className="font-medium">{agent.name}</div>
                                    <div className="text-sm text-slate-500">
                                        ID: {agent.id} | Phone: {agent.contactNo}
                                    </div>
                                    <div className="text-xs text-slate-400">{agent.contactNo}</div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 flex justify-center items-center gap-1 text-sm text-slate-500">
                                No Agent Found
                                {/* <AgentForm button={<span className="text-sm text-blue-500 cursor-pointer">Create Agent</span>} />
                                <Plus size={16} className="text-blue-500"/> */}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}


export default AgentSearchFeature;