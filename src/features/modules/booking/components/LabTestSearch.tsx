import { useState, useEffect, useCallback } from "react";
import type { ITestSchema } from "@/features/booking/data/schema";

export default function LabTestSearch({handleSelectTest}:{handleSelectTest:(test:ITestSchema) => void}) {
  const [query, setQuery] = useState("");
  const [labtests, setLabTests] = useState<ITestSchema[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

 

 const fetchLabtest = useCallback(async () => {
  setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/labtests`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setLabTests(data.employees ?? data);
      setLoading(false);
    } catch (err: any) {
      console.error("Fetch failed:", err);
    }
  }, []);

  useEffect(() => {
    fetchLabtest();
  }, [fetchLabtest]);

    const filteredPatients = labtests?.filter(
    (p) =>
      p.test_name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.includes(query) ||
      p.test_id.toLowerCase().includes(query.toLowerCase())
  );


  const handleSelect = (test: ITestSchema) => {
    setQuery("");
    handleSelectTest(test);
    setShowDropdown(false);
  };

  return (
    <div className="w-full grid grid-cols-[120px_1fr] items-center">
      <div className="font-bold">Test Select</div>
      <div className="relative">
      <input
        type="search"
        id="agent_search"
        name="agent_search"
        placeholder="Search Lab tests"
        value={query}
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="w-2/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-200 outline-none"
      />

      {showDropdown && query && (
        <div className="absolute top-full left-0 w-2/3 mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-3 py-2 text-sm text-slate-500">Loading...</div>
          ) : labtests.length > 0 ? (
            filteredPatients.map((labtest) => (
              <div
                key={labtest.test_id}
                className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                onClick={() => handleSelect(labtest)}
              >
                <div className="font-medium">{labtest.test_name}</div>
                <div className="text-sm text-slate-500">
                  ID: {labtest.category} | Phone: {labtest.price}
                </div>
                <div className="text-xs text-slate-400">{labtest.unit}</div>
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
  );
}
