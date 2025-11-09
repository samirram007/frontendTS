import LabTestList from "./features/LabTestsFeature/test-list";
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
import { useNavigate } from "@tanstack/react-router";
import SampleCollectorSearch from "./features/SampleCollector/sample-collector-search";
import { useBookingTest } from "./context/new-booking-context";
import { usePayment } from "../../contexts/payment-context";
import { useQueryClient } from "@tanstack/react-query";
import PatientComboBoxSearch from "./features/patient-combobox-search";
import LabTestComboBoxSearch from "./features/LabTestsFeature/lab-test-comob-box-search";





const NewBookingFeature = () => {

    const { selectTestItemList } = useLabTestItem();
    const { discountRate } = usePayment();
    const { discountTypeId, sampleCollectorId } = useBookingTest();
    const { patient } = usePatient();
    const navigate = useNavigate();
    const { mutate, isPending } = useBookingMutation();

    const queryClient = useQueryClient();


    const handleValidatePay = () => {
        if (selectTestItemList.length == 0 || patient == undefined) {
            ErrorToast.launchErrorToast("Please select Patient and Test");
            return;
        }
        if (patient?.id != undefined && selectTestItemList) {
            const testBookingObject: IBookingTest = {
                bookingDate: new Date(),
                patientId: patient?.id,
                agentId: patient.agent ? patient.agent.id : null,
                physicianId: patient.physician ? patient.physician.id : null,
                tests: selectTestItemList,
                discountTypeId: discountTypeId,
                sampleCollectorId: sampleCollectorId,
                rate: discountRate ? Number(discountRate.toFixed(2)) : 100
            }

            mutate(testBookingObject, {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: ['get-all-bookings-query'] });
                    const bookingId = data.data.data.id;
                    navigate({ to: `/transactions/booking/${bookingId}` });
                }
            });
        }
    }





    return (
        <div className="grid grid-cols-[1fr_400px] gap-3">
            <div>
                <div className="grid grid-cols-[1fr_450px] gap-4 items-start">
                    <div className="grid grid-rows-2 gap-3">
                        <div className="flex w-full justify-between gap-3">
                            {/* <PatientSearch /> */}
                            <PatientComboBoxSearch />
                            <PatientForm
                                button={
                                    <Button>
                                        <Plus size={16} />
                                    </Button>

                                }
                            />
                        </div>
                        <div>
                            {/* <LabTestSearch /> */}
                            <LabTestComboBoxSearch />
                        </div>


                    </div>
                    <div className="justify-end w-full items-end flex-col gap-3 flex">
                        <div className="grid justify-end w-full items-center grid-cols-[70px_1fr]">
                            <div className="font-bold text-right pr-3">
                                Discount
                            </div>
                            <div className="">
                                <DiscountSelect />
                            </div>
                        </div>
                        <SampleCollectorSearch />
                    </div>
                </div>
                <LabTestList />
            </div>
            <div>
                <div className="border-l-0 text-app-base border-gray-400 py-3 px-2">
                    <PatientDetail />
                    <PaymentDetail />
                    <div className="mt-6  w-full">
                        <PathoProvider>
                            <Button disabled={isPending} onClick={handleValidatePay} className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                                {isPending ? "Confirm this booking" : "Booking processing"}
                            </Button>
                        </PathoProvider>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default NewBookingFeature;