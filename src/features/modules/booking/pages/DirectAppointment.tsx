import { useContext } from "react";
import CreateTest from "../components/CreateTest";
import { ArrowLeft, PenLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EditPatientForm from "../components/Patient/EditPatientForm";
import { PayAndBookModal } from "../components/Payment/PaymentModal";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import PaymentDetail from "../modules/payment-detail/PaymentDetail";
import { PathoContext } from "../contexts/PathoContext";
import { TestBookingContext } from "../contexts/TestBookingContext/TestBookingContext";


function BookingHead(){
  return <div className="w-full grid grid-rows-2 gap-3">

        <div className="grid grid-cols-[120px_1fr] items-center">
          <div>
            <h1 className="font-light">Booking ID: </h1>
          </div>
          <div className="font-semibold">12345678</div>
          <input value={'AABBB111213331'} disabled={true} type="text" id="booking_id" name="booking_id" placeholder="WA12345" className="sr-only border-0 rounded"/>
        </div>



          <div className="grid grid-cols-[120px_1fr] items-center">
            <div className="font-light">Booking Date:</div>
            <div>
              <input
                type="date"
                id="dob"
                onChange={(e)=> console.log(e.target.value)}
                value={new Date().toISOString().split("T")[0]}
                name="dob"
                className="w-full font-semibold py-1 border-0 outline-0 rounded"
              />
            </div>
          </div>
  </div>
}


function BookingHeadRight(){
  return(
    <div className="text-right">
      Recent Booking
    </div>
  )
}







function PatientDetails({}){

  const {patientSearch} = useContext(PathoContext);
  const {selectedLabTest} = useContext(TestBookingContext);

  const handleValidatePay = () =>{
    // ErrorToast.launchErrorToast("Please select Patient and Test");
  }



  return(
    <>
        <div className="border-r-2 text-app-base border-gray-200 py-3 px-2">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-app-base">Patient Details</div>
            <EditPatientForm 
              button={
                <PenLine color="black" className="cursor-pointer" size={16} />
              }
            />
            
          </div>
          <div className="flex justify-between mb-2 gap-3">
            <div className="flex flex-row items-center h-10 w-full gap-3">
              <div className="w-full text-center font-semibold text-lg">{patientSearch?.name ? patientSearch.name : <span className="text-gray-400 text-app-base font-light">Patient name</span>}</div>
            </div>
          </div>
          <div className="flex justify-center h-9 items-center gap-3">
              <div>
                {patientSearch?.age ? patientSearch.age : <span className="text-gray-400 font-light">Age</span>}
              </div>
              <Separator className="bg-black" orientation="vertical"/>
              <div>
                {patientSearch?.gender ? patientSearch.gender : <span className="text-gray-400 font-light">Gender</span>}
              </div>
              <Separator className="bg-black" orientation="vertical"/>
              <div>
                {patientSearch?.phone ? patientSearch.phone : <span className="text-gray-400 font-light">Phone number</span>}
              </div>
          </div>
          <div className="flex my-6 flex-col">
            <div className="flex items-center mb-2 gap-3">
              <div>
                Physician:
              </div>
              <div className="font-semibold">
                {patientSearch?.physician ? patientSearch.physician.name : <span className="text-gray-400 font-light">Physician</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                Referred By:
              </div>
              <div className="font-semibold">
                {patientSearch?.agent ? patientSearch.agent.name : <span className="text-gray-400 font-light">Agent</span>}
              </div>
            </div>
          </div>
          <PaymentDetail/>
          <div className="mt-6  w-full">
             {/* <Button onClick={handleValidatePay} className={`text-center cursor-pointer !py-3 text-lg w-full`}>
                    Pay & Book
                </Button> */}
            {
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
            }
            
          </div>
        </div>
          
    </>
  )
}



export default function DirectAppointment() {
  return (
    <div className="px-4 py-5">

      <div className="grid mb-4 grid-cols-[100px_1fr]">
        <Link to="/" className="font-semibold flex flex-wrap underline underline-offset-2 gap-1 items-center text-blue-500">
          <ArrowLeft size={17} />
          Go Back
        </Link>
        <div className="text-2xl text-center text-dark items-center justify-center font-semibold">Test Booking</div>
      </div>
            
      <div className="grid mb-8 w-full border-b-2 border-gray-300 pb-3 grid-cols-[300px_1fr] gap-6">
        <BookingHead/>
        <BookingHeadRight/>
      </div>


      <div className="grid grid-cols-[1fr_430px]">
         <div className="">
           <div className="px-4 col-span-2">
          {/* <h1 className="text-lg font-semibold mb-2">Select Test</h1> */}
          <CreateTest/>
        </div>
        </div>
        <div className="">
          <PatientDetails/>
        </div>
       
      </div>
    </div>
 
  );
}