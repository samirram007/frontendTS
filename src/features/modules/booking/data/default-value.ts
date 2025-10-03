import type { AgentInterface, IDiscountSchema, IPatientSchema, PhysicianInterface } from "./schema"



export const AgentDefault:AgentInterface={
    id:0,
    name: "",
    contact: "",
    comission: 0
}


export const PhysicianDefault:PhysicianInterface={
    id:0,
    name: "",
    contact: "",
    degree: ""
}



export const PatientDefault:IPatientSchema = {
    id:0,
    name: "",
    phone: "",
    gender: "",
    age: "",
    dob: "",
    agentId: 0,
    physicianId: 0,
    agent: AgentDefault,
    physician: PhysicianDefault
}




export const DiscountDefaultVal:IDiscountSchema={
    id: 0,
    name: "",
    discount_type: "",
    value: 0
}