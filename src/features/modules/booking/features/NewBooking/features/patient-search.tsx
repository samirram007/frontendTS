import { useEffect, useState } from "react";
import { useGetPatientListQuery } from "./CreatePatientFeature/data/queryOptions";
import type { IPatient } from "./CreatePatientFeature/data/schema";
import { usePatient } from "../../../contexts/patient-context";





const PatientSearch = () => {

    const {data,isSuccess} = useGetPatientListQuery();
    const {setPatient} = usePatient();
    const [query,setQuery] = useState<string>("");
    const [showDropdown,setShowDropdown] = useState<boolean>(false);
    const [patientList,setPatientList] = useState<IPatient[]>([]);


    useEffect(()=>{
        if(isSuccess){
            setPatientList(data.data.data);
        }
    },[isSuccess,data]);

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value);
        setShowDropdown(true);
        if(e.target.value == ""){
            setPatient(null);
        }
    }

    const filteredPatientList = patientList?.filter((p)=>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.contactNo.includes(query)
    );

    const handleSelectPatient = (patient: IPatient) =>{
        setPatient(patient);
        setShowDropdown(false);
        setQuery(patient.name);
    }


    return (
        <div className="w-full">
            <div className="grid grid-cols-[100px_1fr] items-center">
                <div>
                    <label htmlFor="appointment_search" className="font-bold text-[13px]">
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
                        onChange={(e) => handleSearch(e)}
                        onFocus={() => query && setShowDropdown(true)}
                        className="w-3/3 px-3 py-2 border rounded-lg outline-none"
                    />

            {/* create new patient action */}
                    {/* <div>
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
                    </div> */}


                    {showDropdown && query && (
                        <div
                            tabIndex={0}
                            className="absolute top-full left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10 max-h-60 overflow-y-auto"
                        >
                            {filteredPatientList?.length > 0 ? (
                                filteredPatientList.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className={`px-3 py-2 cursor-pointer`}
                                        onClick={() => handleSelectPatient(patient)}
                                    >
                                        <div className="font-medium">{patient.name}</div>
                                        <div className="text-sm text-slate-500">
                                            ID: {patient.id} | Phone: {patient.contactNo}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-slate-500">
                                    {/* <PatientForm button={
                                        <h3 className="text-blue-400 underline underline-offset-1 text-center cursor-pointer">Add new Patient</h3>
                                    } /> */}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}


export default PatientSearch;