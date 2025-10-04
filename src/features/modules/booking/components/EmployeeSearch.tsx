import { useCallback, useEffect, useState } from "react";
import { useClickOutside } from "../utils/outsideClickHandler";




export interface IEmployeeInterface{
    employee_id: string,
    name: string,
    role: string,
    department: string,
    email: string,
    phone: string,
    date_of_joining: string,
    shift: string,
    salary: number
}



export default function EmployeeSearch() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [employees,setEmployees] = useState<IEmployeeInterface[]>([]);

  const dropdownRef = useClickOutside(() => setShowDropdown(false));

  // Filter patients based on query
  const filteredPatients = employees?.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query) ||
      p.employee_id.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (employee: IEmployeeInterface) => {
    setQuery(employee.name);
    setShowDropdown(false);
  };

 const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/employees`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setEmployees(data.employees ?? data);
    } catch (err: any) {
      console.error("Fetch failed:", err);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);


  return (
    <div className="relative w-full">
      <input
        type="text"
        id="appointment_search"
        name="appointment_search"
        placeholder="Search sample collector"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true); // open dropdown when typing
        }}
        onFocus={() => query && setShowDropdown(true)} // open dropdown on focus if query exists
        className="w-full px-3 py-2 border-b-1 placeholder:text-[13px] rounded-lg outline-none"
      />

      {showDropdown && query && (
        <div ref={dropdownRef} className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.employee_id}
                className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                onClick={() => handleSelect(patient)}
              >
                <div className="font-medium">{patient.name}</div>
                <div className="text-sm text-slate-500">
                  ID: {patient.employee_id} | Phone: {patient.phone}
                </div>
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
  );
}
