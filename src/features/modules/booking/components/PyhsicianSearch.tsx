import { useContext, useState } from "react";
import CreatePhysician from "./CreatePhysician";
import { Search } from "lucide-react";
import { PathoContext } from "../contexts/PathoContext";
import PhysicianData from "../data/physician.json"
import type { PhysicianInterface } from "../data/schema";

export default function PhysicianSearch() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const {setPhysicianDetail} = useContext(PathoContext);

  const filteredPatients = PhysicianData.filter(
    (p) =>
      p.degree.toLowerCase().includes(query.toLowerCase()) ||
      p.name.includes(query) ||
      p.contact.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (pyhsician: PhysicianInterface) => {
    setPhysicianDetail(pyhsician);
    setQuery(pyhsician.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full grid grid-cols-[1fr_30px] items-center border-1 rounded focus:border-emerald-600 ">
      <input
        type="search"
        id="appointment_search"
        name="appointment_search"
        placeholder="Search existing Patient by name, phone, or ID..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if(e.target.value == ''){
            setPhysicianDetail(null);
          }
          setShowDropdown(true); // open dropdown when typing
        }}
        onFocus={() => query && setShowDropdown(true)} // open dropdown on focus if query exists
        className="w-full px-3 py-1 border-0 focus:border-0 ring-0 placeholder:text-[12px] outline-none"
      />
      <Search size={16} />
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
                  ID: {pyhsician.id} | Phone: {pyhsician.contact}
                </div>
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-slate-500">
              <CreatePhysician button={<span className="text-sm text-blue-500 cursor-pointer">Create Pyhsician</span>} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
