import React, { createContext } from "react";
import type { AgentInterface, IPatientSchema, PhysicianInterface } from "../data/schema";
import { AgentDefault, PatientDefault, PhysicianDefault } from "../data/default-value";
import type { PaymentTypeSchema } from "../features/NewBooking/features/PaymentFeature/data/schema";




interface PathoInterface{
    searchBooking:string;
    setSearchBooking: React.Dispatch<React.SetStateAction<string>>;
    patientSearch:IPatientSchema | null;
    setPatientSearch: React.Dispatch<React.SetStateAction<IPatientSchema | null>>;
    patientName:string;
    setPatietName:React.Dispatch<React.SetStateAction<string>>;
    patientPhone:string;
    setPatietPhone: React.Dispatch<React.SetStateAction<string>>;
    patientGender:string;
    setPatietGender: React.Dispatch<React.SetStateAction<string>>;
    patientAge:string
    setPatietAge: React.Dispatch<React.SetStateAction<string>>;
    patientDob: Date | null;
    setPatietDOB: React.Dispatch<React.SetStateAction<Date | null>>;

    // section of payment context
    amountToBePaid:number;
    setAmountToBePaid:React.Dispatch<React.SetStateAction<number>>
    remaningAmount: number,
    setRemaningAmount: React.Dispatch<React.SetStateAction<number>>,
    dueAmount:number,
    setDueAmount: React.Dispatch<React.SetStateAction<number>>;
    totalPrice:number;
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>,
    totalAmount: number,
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>,
    netAmount: number,
    setNetAmount: React.Dispatch<React.SetStateAction<number>>;

    // pyhsician context
    physicianDetail:PhysicianInterface | null,
    setPhysicianDetail: React.Dispatch<React.SetStateAction<PhysicianInterface | null>>,
    agentDetail:AgentInterface | null,
    setAgentDetail: React.Dispatch<React.SetStateAction<AgentInterface | null>>,

    // Discounts
    discountDetail:string,
    setDiscountDetail: React.Dispatch<React.SetStateAction<string>>,
    discountAmount:number,
    setDiscountAmount: React.Dispatch<React.SetStateAction<number>>,
    discountedAmount:number,
    setDiscountedAmount: React.Dispatch<React.SetStateAction<number>>,

    // patient create
    patientCreate: IPatientSchema | null;
    setPatientCreate: React.Dispatch<React.SetStateAction<IPatientSchema | null>>;

    // payment method
    paymentMethod: PaymentTypeSchema | null;
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentTypeSchema | null>>;
}

const defaultValue:PathoInterface={
    searchBooking:"",
    setSearchBooking:() => {},
    patientSearch:PatientDefault,
    setPatientSearch:() =>{},
    patientName:"",
    setPatietName:()=>{},
    patientPhone:"",
    setPatietPhone:()=>{},
    patientGender:"",
    setPatietGender:()=>{},
    patientAge:"",
    setPatietAge:()=>{},
    patientDob: null,
    setPatietDOB:()=>{},

    // payment detail context
    amountToBePaid:0,
    setAmountToBePaid:()=>{},
    remaningAmount:0,
    setRemaningAmount:()=>{},
    dueAmount:0,
    setDueAmount:()=>{},
    totalPrice:0,
    setTotalPrice:()=>{},
    totalAmount:0,
    setTotalAmount:()=>{},
    netAmount:0,
    setNetAmount:()=>{},

    // physician details
    physicianDetail:PhysicianDefault,
    setPhysicianDetail:() =>{},

    // agent details
    agentDetail:AgentDefault,
    setAgentDetail:()=>{},

    // discount details
    discountDetail:'',
    setDiscountDetail:() =>{},
    discountAmount:0,
    setDiscountAmount:()=>{},
    discountedAmount:0,
    setDiscountedAmount:()=>{},

    // patient create
    patientCreate: PatientDefault,
    setPatientCreate:()=>{},

    // payment method
    paymentMethod:null,
    setPaymentMethod:()=>{}
}


export const PathoContext = createContext(defaultValue);