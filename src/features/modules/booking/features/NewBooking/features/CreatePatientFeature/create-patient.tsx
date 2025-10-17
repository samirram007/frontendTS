import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Field, Form, Formik} from "formik";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PenLine, Plus } from "lucide-react";
import { InputBox } from "@/features/modules/booking/utils/components/InputBox";
import { SelectBox } from "@/features/modules/booking/utils/components/SelectBox";
import DiscountSelect from "../DiscountFeature/discount-select";
import PhysicianSearchFeature from "../PhysicianFeature/physician-search-feature";
import PhysicianForm from "../PhysicianFeature/create-physician-feature";
import AgentSearchFeature from "../AgentFeature/agent-search-feature";
import AgentForm from "../AgentFeature/create-agent-feature";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import { patientRequestSchema, type IPatient } from "./data/schema";
import { usePatientMutation } from "./data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { showErrors } from "@/utils/dataClient";


interface IPatientForm{
    button?: React.ReactElement | string;
    action?:string
}



const PatientForm: React.FC<IPatientForm> = ({button,action}) =>{

    const {patient,setPatient} = usePatient();
    const {mutate,isPending} = usePatientMutation();
    const [open,setOpen] = useState<boolean>(false);


    const queryClient = useQueryClient();

    return(
        <Dialog open={open} onOpenChange={(value)=>{
            setOpen(value);
            if(action != "Edit"){
                setPatient(null);
            }
        }}>
            <DialogTrigger asChild>
                {button ? button : <span className="text-blue-600 underline underline-offset-1">Add new patient</span>}
            </DialogTrigger>
            <DialogContent aria-description="Patient Creation form of new Patient" aria-describedby="patient-creation-form" className="sm:max-w-8/12">
                <DialogHeader>
                    <DialogTitle>
                        {action && action}
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Patient create form
                    </DialogDescription>
                </DialogHeader>
                <div id="patient-creation-form">
                    <Formik
                        onSubmit={(values,actions)=>{
                             const payload: IPatient = {
                                id: values.id,
                                name: values.name,
                                age: values.age || 0,
                                status: values.status,
                                gender: values.gender,
                                contactNo: values.contactNo,
                                accountLedgerId: values.accountLedgerId,
                                address: values.address,
                                agentId: patient?.agent?.id,
                                physicianId: patient?.physician?.id
                            };
                            mutate(payload,{
                                onSuccess:(data) =>{
                                    if(data.data.success == false){
                                        showErrors(data.data);
                                        return;
                                    }
                                    setPatient(data.data.data);
                                    queryClient.invalidateQueries({queryKey:['get-patient-query']});
                                    toast.success("Patient created successfully");

                                    setTimeout(() => {
                                        setOpen(false);
                                    }, 700);
                                },
                                onError:(error)=>{
                                    toast.error(error.message);
                                }
                            })
                            setTimeout(() => {
                                actions.setSubmitting(false);
                            }, 700);
                        }}
                        validationSchema={patientRequestSchema}
                        initialValues={{
                            id: action != "Edit" ? undefined : patient?.id,
                            name: action != "Edit" ? "" : patient?.name || "",
                            contactNo: action != "Edit" ? "" : patient?.contactNo || "",
                            age: action != "Edit" ? 0 : patient?.age,
                            gender: action != "Edit" ? "male" : patient?.gender,
                            agentId: action != "Edit" ? 0 : patient?.agent?.id,
                            physicianId: action != "Edit" ? 0 : patient?.physician?.id,
                            accountLedgerId:0,
                            address:{
                                line1: action != "Edit" ? "" : patient?.address?.line1 || "",
                                line2: action != "Edit" ? "" : patient?.address?.line2 || "",
                                city: action != "Edit" ? "" : patient?.address?.city || "",
                                stateId: action != "Edit" ? 0 : patient?.address?.stateId || 0,
                                isPrimary: action != "Edit" ? true : patient?.address?.isPrimary || true,
                                postalCode: action != "Edit" ? "" : patient?.address?.postalCode || "x"
                            },
                            status: patient?.status || 'active'
                        }}
                    >
                        {({})=>(
                            <Form>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="grid grid-cols-1 gap-8 mb-4">
                                            <div className="text-app-base-lg border-black font-bold border-b-2">Patient Details</div>
                                            <InputBox placeholder="Enter Patient name" type="text" name="name" label="Name" />
                                            <InputBox placeholder="Enter patient phone number" name="contactNo" type="text" label="Phone Number" />
                                            <InputBox placeholder="Enter patient age" type="text" name="age" label="Age" />
                                            <SelectBox name="gender" label="Gender" 
                                                options={[
                                                    {value:"male",label:"Male"},
                                                    {value:"female",label:"Female"},
                                                    {value:"others",label:"Others"},
                                                ]} 
                                            />
                                            <div className="grid grid-cols-[120px_1fr] w-full max-w-lg items-center">
                                                <div className="text-app-small">Discount</div>
                                                <div className="w-10/12 overflow-hidden">
                                                    <DiscountSelect/>
                                                </div>
                                                
                                            </div>

                                            <Separator className="border-1 border-gray-800" />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="grid grid-cols-[80px_1fr_40px] mb-2 items-center gap-6">
                                            <h1 className="font-semibold text-app-base-lg">Physician</h1>
                                            <PhysicianSearchFeature/>
                                            <PhysicianForm button={
                                                    <Button className="!py-0.5 h-8 !px-2" variant={'default'}>
                                                        <Plus size={8} className="cursor-pointer" />
                                                    </Button>
                                                }
                                            />
                                        </div>
                                        
                                        {/* if physician exists then use it if not then create it if want to edit the existing data then do it */}
                                        <div className="grid grid-cols-[1fr_30px] border-[1px] bg-yellow-100 border-yellow-300 rounded-lg px-2 py-2 shadow-md shadow-gray-400">
                                            <div className="flex flex-col  gap-3  cursor-pointer  justify-evenly">
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Name:</div>
                                                    <Field type="hidden" name="agentId"  />
                                                    <div className="font-bold">{patient?.physician != undefined ? patient.physician?.name : <span className="font-light text-gray-400 text-app-small">Physician Name</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Degree:</div>
                                                    <div className="font-bold">{patient?.physician != undefined ? patient.physician?.degree : <span className="font-light text-gray-400 text-app-small">Physician Degree</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Contact:</div>
                                                    <div className="font-bold">{patient?.physician != undefined  ? patient.physician?.contactNo : <span className="font-light text-gray-400 text-app-small">Physician Contact</span> }</div>
                                                </div>
                                                {/* <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Discipline:</div>
                                                    <div className="font-bold">{physicianDetail  ? patient?.physician.discipline : <span className="font-light text-gray-400 text-app-small">Physician Discipline</span> }</div>
                                                </div> */}
                                            </div>
                                            <PhysicianForm 
                                                button={
                                                    <PenLine className="cursor-pointer" size={18} />
                                                }
                                                action="Edit"
                                            />
                                        </div>
                                        
                                        
                                        <Separator className="my-3 bg-black" />

                                        
                                        <div className="grid grid-cols-[80px_1fr_40px] mb-2 items-center gap-6">
                                            <h1 className="font-semibold text-app-base-lg">Referred By</h1>
                                            <AgentSearchFeature/>
                                            <AgentForm button={
                                                <Button className="!py-0.5 h-8 !px-2" variant={'default'}>
                                                <Plus size={20} className="cursor-pointer" />
                                                </Button>
                                            } />
                                        </div>

                                        <div className="grid grid-cols-[1fr_30px] bg-red-100 border-[1px] border-red-300 rounded-lg px-2 py-2 shadow-md shadow-gray-400">
                                            <div className="flex flex-col gap-3  cursor-pointer justify-evenly">
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Name:</div>
                                                    <div className="font-bold">{patient?.agent != undefined ? patient.agent?.name : <span className="font-light text-gray-400 text-app-small">Agent Name</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Contact:</div>
                                                    <div className="font-bold">{patient?.agent != undefined ? patient.agent?.contactNo : <span className="font-light text-gray-400 text-app-small">Agent Contact</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Comission:</div>
                                                    <div className="font-bold">{patient?.agent != undefined ? <>{patient.agent?.commissionPercent}{' %'}</>   : <span className="font-light text-gray-400 text-app-small">Agent Comission</span>}</div>
                                                </div>
                                            </div>
                                            <AgentForm
                                                button={
                                                    <PenLine className="cursor-pointer" size={18} />
                                                }
                                                action="Edit"
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                 <div className="grid grid-cols-[90px_1fr_1fr_1fr_1fr] gap-3 w-full">
                                                <div className="text-base font-semibold">Address: </div>
                                                <InputBox className="w-full" placeholder="Address Line 1" type="text" name="address.line1"  />
                                                <InputBox className="w-full" placeholder="Address Line 2" type="text" name="address.line2" />
                                                <InputBox className="w-full" placeholder="City" type="text" name="address.city"/>
                                                <InputBox className="w-full" placeholder="Postal Code"  type="text" name="address.postalCode"/>
                                            </div>
                                <div className="grid  justify-center gap-3 mt-4 border-t-2 border-gray-200 pt-4">
                                    <Button type="submit" variant={'default'} size={'sm'} className="!bg-blue-500 !text-white !px-12 !py-4 text-app-base-lg">
                                        {isPending ? "Saving...." : action == "Edit" ? "Save and Use" : "Save"}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default PatientForm;