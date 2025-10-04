"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import CreateAgent from "./CreateAgent";
import { Search } from "lucide-react";
import { PathoContext } from "../contexts/PathoContext";
import type { AgentInterface } from "../data/schema";



export default function AgentSearch() {
  const {setAgentDetail} = useContext(PathoContext);
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState<AgentInterface[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAgent = useCallback(async () => {
   setLoading(true);
     try {
       const res = await fetch(`http://localhost:5000/agents`);
       if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
       }
       const data = await res.json();
       setAgents(data.employees ?? data);
       setLoading(false);
     } catch (err: any) {
       console.error("Fetch failed:", err);
     }
   }, []);
 
   useEffect(() => {
     fetchAgent();
   }, [fetchAgent]);

  const filteredPatients = agents?.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.contact.toLowerCase().includes(query.toLowerCase())
  );




  const handleSelect = (agent: AgentInterface) => {
    setAgentDetail(agent);
    setQuery(agent.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full grid grid-cols-[1fr_30px] items-center border-1 rounded focus:border-emerald-600 ">
      <input
        type="search"
        id="agent_search"
        name="agent_search"
        placeholder="Search Agent by name, contact, or ID..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          if(e.target.value == ''){
            setAgentDetail(null);
          }
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-3 py-1 border-0 ring-0 placeholder:text-[12px]  outline-none"
      />
      <Search size={16}/>
      {showDropdown && query && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-3 py-2 text-sm text-slate-500">Loading...</div>
          ) : filteredPatients.length > 0 ? (
            filteredPatients.map((agent) => (
              <div
                key={agent.id}
                className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                onClick={() => handleSelect(agent)}
              >
                <div className="font-medium">{agent.name}</div>
                <div className="text-sm text-slate-500">
                  ID: {agent.id} | Phone: {agent.contact}
                </div>
                <div className="text-xs text-slate-400">{agent.comission}</div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-slate-500">
              <CreateAgent button={<span className="text-sm text-blue-500 cursor-pointer">Create Agent</span>} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
