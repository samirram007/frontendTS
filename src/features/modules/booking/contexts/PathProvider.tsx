import { useState } from "react";
import { PathoContext } from "./PathoContext";
import { PaymentTypeSchema, type AgentInterface, type IPatientSchema, type PhysicianInterface } from "../data/schema";





const PathoProvider = ({children}:any) =>{

    const [searchBooking,setSearchBooking] = useState<string>("");
    const [patientSearch,setPatientSearch] = useState<IPatientSchema | null>(null);
    const [patientName,setPatietName] = useState<string>(patientSearch?.name ?? "");
    const [patientPhone,setPatietPhone] = useState<string>(patientSearch ? patientSearch.phone : "");
    const [patientGender,setPatietGender] = useState<string>(patientSearch ? patientSearch.gender : "");
    const [patientAge,setPatietAge] = useState<string>(patientSearch ? String(patientSearch.age) : "");
    const [patientDob,setPatietDOB] = useState<Date | null>(new Date());
    const [amountToBePaid,setAmountToBePaid] = useState<number>(0);
    const [remaningAmount,setRemaningAmount] = useState<number>(0);
    const [totalPrice,setTotalPrice] = useState<number>(0);
    const [totalAmount,setTotalAmount] = useState<number>(0);
    const [physicianDetail,setPhysicianDetail] = useState<PhysicianInterface | null>(null);
    const [agentDetail,setAgentDetail] = useState<AgentInterface | null>(null);
    const [discountAmount,setDiscountAmount] = useState<number>(0);
    const [discountedAmount,setDiscountedAmount] = useState<number>(0);
    const [discountDetail,setDiscountDetail] = useState<string>('');
    const [patientCreate,setPatientCreate] = useState<IPatientSchema | null>(null);
    const [paymentMethod,setPaymentMethod] = useState<PaymentTypeSchema | null>(PaymentTypeSchema.CASH);
    const [netAmount,setNetAmount] = useState<number>(0);
    const [dueAmount,setDueAmount] = useState<number>(0);
    
    return(
        <PathoContext.Provider value={{
            searchBooking,setSearchBooking,
            patientSearch,setPatientSearch,
            patientName,setPatietName,
            patientPhone,setPatietPhone,
            patientGender,setPatietGender,
            patientAge,setPatietAge,
            patientDob,setPatietDOB,
            amountToBePaid,setAmountToBePaid,
            remaningAmount,setRemaningAmount,
            totalPrice,setTotalPrice,
            totalAmount,setTotalAmount,
            physicianDetail,setPhysicianDetail,
            agentDetail,setAgentDetail,
            discountAmount,setDiscountAmount,
            discountedAmount,setDiscountedAmount,
            discountDetail,setDiscountDetail,
            patientCreate,setPatientCreate,
            paymentMethod,setPaymentMethod,
            netAmount,setNetAmount,
            dueAmount,setDueAmount
        }}>
            {children}
        </PathoContext.Provider>
    )
}


export default PathoProvider;