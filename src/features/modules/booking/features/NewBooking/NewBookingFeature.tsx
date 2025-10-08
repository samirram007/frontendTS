// import { useContext } from "react";
import LabTestSearch from "./features/LabTestsFeature/lab-tests-search";
import PatientSearch from "./features/patient-search";
import LabTestList from "./features/LabTestsFeature/test-list";
// import { TestBookingContext } from "../../contexts/TestBookingContext/TestBookingContext";
// import { PathoContext } from "../../contexts/PathoContext";
import { Button } from "@/components/ui/button";
import { PaymentDetail } from "./features/PaymentFeature/payment-detail";
import { PatientDetail } from "./features/patient-details";
import DiscountSelect from "./features/DiscountFeature/discount-select";
import PatientForm from "./features/CreatePatientFeature/create-patient";
import { Plus } from "lucide-react";
import PathoProvider from "../../contexts/PathProvider";
import { useLabTestItem } from "./features/LabTestsFeature/context/lab-test-context";
import { usePatient } from "../../contexts/patient-context";
import { ErrorToast } from "../../utils/error-response";
import { useBookingMutation } from "./data/queryOptions";
import type { IBookingTest } from "./data/schema";
import { useBookingTest } from "./context/new-booking-context";
import InvoiceFeatureModal from "./features/InvoiceFeature/invoice-feature-modal";
import { useNavigate } from "@tanstack/react-router";





const NewBookingFeature = () => {

    const {selectTestItemList} = useLabTestItem();
    const {patient} = usePatient();
    const {setBookingData} = useBookingTest();
     const navigate = useNavigate();
    const {mutate} = useBookingMutation();


    const handleValidatePay = () =>{
        if(selectTestItemList.length == 0){
            ErrorToast.launchErrorToast("Please select Patient and Test");
            return;
        }
        if(patient?.id != undefined && selectTestItemList){
            const testBookingObject: IBookingTest = {
                bookingDate: new Date(),
                patientId: patient?.id,
                agentId: patient.agent?.id,
                physicianId: patient.physician?.id,
                tests: selectTestItemList
            }
            
            mutate(testBookingObject,{
                onSuccess:(data)=>{
                    const bookingId = data.data.data.id;
                    setBookingData(data.data);
                    navigate({ to: `/transactions/booking/${bookingId}` });
                }
            });
        }
    }





    return (
        <div className="grid grid-cols-[1fr_400px] gap-3">
            <div>
                <div className="grid grid-cols-[1fr_380px] items-start">
                    <div className="grid grid-rows-2 gap-3">
                        <div className="flex w-full justify-between gap-3">
                            <PatientSearch />
                            <PatientForm
                                button={
                                    <Button>
                                        <Plus size={16} />
                                    </Button>
                                    
                                }
                            />
                        </div>
                        <div>
                            <LabTestSearch />
                        </div>
                        
                        
                    </div>
                    <div className="justify-end w-full items-end overflow-hidden flex">
                        <div className="grid justify-end w-full items-center grid-cols-[100px_1fr]">
                            <div className="font-bold text-right pr-3">
                                Discount
                            </div>
                            <div className="">
                                <DiscountSelect/>
                            </div>
                        </div>
                    </div>
                </div>
                <LabTestList />
            </div>
            <div>
                <div className="border-l-0 text-app-base border-gray-400 py-3 px-2">
                    <PatientDetail/>
                    <PaymentDetail/>
                    <div className="mt-6  w-full">
                        <PathoProvider>
                            <Button onClick={handleValidatePay} className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                                Book & Pay
                            </Button>
                        </PathoProvider>
                    </div>
                </div>
                <div>
                    <InvoiceFeatureModal
                        button={
                            <span className="text-blue-500 underline underline-offset-1">Payment Invoice</span>
                        }
                    />
                </div>
            </div>
        </div>

    )
}


export default NewBookingFeature;