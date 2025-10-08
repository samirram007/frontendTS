import { useContext, useState, useEffect, useRef } from "react";
import PatientData from "../data/patient.json";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientForm from "./Patient/CreatePatientForm";
import { PathoContext } from "../contexts/PathoContext";
import type { IPatientSchema } from "../data/schema";

export default function AppointmentSearch() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { setPatientSearch } = useContext(PathoContext);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredPatients = PatientData.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query)
  );

  const handleSelect = (patient: IPatientSchema) => {
    setQuery(patient.name);
    setPatientSearch(patient);
    setShowDropdown(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredPatients.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredPatients.length - 1 ? prev + 1 : 0
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredPatients.length - 1
      );
    }
    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredPatients[highlightedIndex]);
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-[120px_1fr] items-center">
        <div>
          <label htmlFor="appointment_search" className="font-bold">
            Patient Select
          </label>
        </div>

        <div className="relative flex items-center gap-4">
          <input
            type="search"
            id="appointment_search"
            name="appointment_search"
            placeholder="Search existing Patient by name, phone, or ID..."
            value={query}
            autoComplete="off"
            onChange={(e) => {
              setQuery(e.target.value);
              setPatientSearch(null);
              setShowDropdown(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => query && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            className="w-2/3 px-3 py-2 border rounded-lg outline-none"
          />

          <div>
            <PatientForm
              button={
                <Button
                  title="Add New Patient"
                  className="cursor-pointer"
                  variant={"default"}
                >
                  <Plus size={30} />
                </Button>
              }
            />
          </div>
         

          {showDropdown && query && (
            <div
              tabIndex={0}
              className="absolute top-full left-0 w-2/3 mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto"
            >
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, idx) => (
                  <div
                    key={patient.id}
                    ref={(el) => {itemRefs.current[idx] = el}}
                    className={`px-3 py-2 cursor-pointer ${
                      idx === highlightedIndex
                        ? "bg-emerald-200"
                        : "hover:bg-emerald-100"
                    }`}
                    onClick={() => handleSelect(patient)}
                  >
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-slate-500">
                      ID: {patient.id} | Phone: {patient.phone}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-slate-500">
                  <PatientForm button={
                    <h3 className="text-blue-400 underline underline-offset-1 text-center cursor-pointer">Add new Patient</h3>
                  } />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
