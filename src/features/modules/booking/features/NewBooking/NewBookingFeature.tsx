// import { useContext } from "react";
import LabTestSearch from "./features/LabTestsFeature/lab-tests-search";
import PatientSearch from "./features/patient-search";
import LabTestList from "./features/LabTestsFeature/test-list";
// import { TestBookingContext } from "../../contexts/TestBookingContext/TestBookingContext";
// import { PathoContext } from "../../contexts/PathoContext";
import { Button } from "@/components/ui/button";
import { PayAndBookModal } from "../../components/Payment/PaymentModal";
import { PaymentDetail } from "./features/payment-detail";
import { PatientDetail } from "./features/patient-details";
import DiscountSelect from "./features/DiscountFeature/discount-select";
import PatientForm from "./features/CreatePatientFeature/create-patient";
import { Plus } from "lucide-react";
import PathoProvider from "../../contexts/PathProvider";





const NewBookingFeature = () => {

    //   const {selectedLabTest} = useContext(TestBookingContext);
    //     const {patientSearch} = useContext(PathoContext);

//           const handleValidatePay = () =>{
//     // ErrorToast.launchErrorToast("Please select Patient and Test");
//   }


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
                                 <PayAndBookModal
                                    button={
                                        <Button className="text-center cursor-pointer !py-3 text-lg w-full">
                                            Pay & Book
                                        </Button>
                                    }
                                />
                        </PathoProvider>
                       
                        {/* {
                            selectedLabTest.length == 0 || patientSearch == null ?
                                <Button onClick={handleValidatePay} className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                                    Pay & Book
                                </Button>
                                :
                                <PayAndBookModal
                                    button={
                                        <Button className="text-center cursor-pointer !py-3 text-lg w-full">
                                            Pay & Book
                                        </Button>
                                    }
                                />
                        } */}

                    </div>
                </div>

            </div>
        </div>

    )
}


export default NewBookingFeature;