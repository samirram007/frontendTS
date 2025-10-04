import { PenLine } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import PatientForm from "./CreatePatientFeature/create-patient";
import { usePatient } from "../../../contexts/patient-context";






export function PatientDetail() {

    const {patient} = usePatient();
    console.log(patient,"patient");

    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="font-semibold text-lg">Patient Details</div>
                <PatientForm
                    button={
                        <PenLine color="black" className="cursor-pointer" size={16} />
                    }
                    action="Edit"
                />

            </div>
            <div className="flex justify-between mb-2 gap-3">
                <div className="flex flex-row items-center h-10 w-full gap-3">
                    <div className="w-full text-center font-semibold text-lg">{patient?.name ? patient.name : <span className="text-gray-400 text-app-base font-light">Patient name</span>}</div>
                </div>
            </div>
            <div className="flex justify-center h-9 items-center gap-3">
                <div>
                    {patient?.age ? patient.age : <span className="text-gray-400 font-light">Age</span>}
                </div>
                <Separator className="bg-black" orientation="vertical" />
                <div>
                    {patient?.gender ? patient.gender : <span className="text-gray-400 font-light">Gender</span>}
                </div>
                <Separator className="bg-black" orientation="vertical" />
                <div>
                    {patient?.contactNo ? patient.contactNo : <span className="text-gray-400 font-light">Phone number</span>}
                </div>
            </div>
            <div className="flex my-6 flex-col">
                <div className="flex items-center mb-2 gap-3">
                    <div>
                        Physician:
                    </div>
                    <div className="font-semibold">
                        {patient?.physician ? patient.physician.name : <span className="text-gray-400 font-light">Physician</span>}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        Referred By:
                    </div>
                    <div className="font-semibold">
                        {patient?.agent ? patient.agent.name : <span className="text-gray-400 font-light">Agent</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}