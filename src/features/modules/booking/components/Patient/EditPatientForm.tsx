import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Field, Form, Formik} from "formik";
import { InputBox } from "../../utils/components/InputBox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SelectBox } from "../../utils/components/SelectBox";
import PhysicianSearch from "../PyhsicianSearch";
import { PenLine, Plus } from "lucide-react";
import AgentSearch from "../AgentSearch";
import CreatePhysician from "../CreatePhysician";
import CreateAgent from "../CreateAgent";
import DiscountSelect from "../Discount/DiscountSelect";
import { useContext } from "react";
import EditPhysician from "../Physician/EditPhysicianForm";
import EditAgent from "../ReferredBy/EditReferredBy";
import { PathoContext } from "../../contexts/PathoContext";


interface IPatientForm{
    button?: React.ReactElement | string;
    action?:string
}



const EditPatientForm: React.FC<IPatientForm> = ({button,action}) =>{

    const {patientSearch} = useContext(PathoContext);


    return(
        <Dialog>
            <DialogTrigger disabled={patientSearch == null ? true : false}>
                {button ? button : <span className="text-blue-600 underline underline-offset-1">Edit new patient</span>}
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
                            console.log("values",values);
                            setTimeout(() => {
                                actions.setSubmitting(false);
                            }, 1000);
                        }}
                        enableReinitialize
                        initialValues={{
                            id: patientSearch?.id || 0,
                            name: patientSearch?.name || "",
                            phone: patientSearch?.phone || "",
                            gender: patientSearch?.gender || "",
                            age: patientSearch?.age || "",
                            agent:{
                                id: patientSearch?.agent?.id || 0,
                                name: patientSearch?.agent?.name || "",
                                contact: patientSearch?.agent?.contact || "",
                                comission: patientSearch?.agent?.comission || ""
                            },
                            physician:{
                                id: patientSearch?.physician?.id || 0,
                                name: patientSearch?.physician?.name || "",
                                contact: patientSearch?.physician?.contact || "",
                                degree: patientSearch?.physician?.degree || "",
                                discipline: patientSearch?.physician?.discipline || ""
                            }
                        }}
                    >
                        {({})=>(
                            <Form>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="grid grid-cols-1 gap-8 mb-4">
                                            <div className="text-app-base-lg border-black font-bold border-b-2"> Edit Patient Details</div>
                                            <InputBox placeholder="Enter Patient name" type="text" name="name" label="Name" />
                                            <InputBox placeholder="Enter patient phone number" name="phone" type="text" label="Phone Number" />
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
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="grid grid-cols-[100px_1fr_40px] mb-2 items-center gap-6">
                                            <h1 className="font-semibold text-app-base-lg">Physician</h1>
                                            <PhysicianSearch/>
                                            <CreatePhysician button={
                                                <Button variant={'default'}>
                                                <Plus size={20} className="cursor-pointer" />
                                                </Button>
                                            } />
                                        </div>
                                        <div className="grid grid-cols-[1fr_20px] border-[1px] bg-yellow-100 cursor-pointer border-yellow-300 rounded-lg px-2 py-3 shadow-md shadow-gray-400">
                                            <div className="flex flex-col  justify-evenly gap-3 ">
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Name:</div>
                                                    <Field type="hidden" name="physician.name"  />
                                                    <div className="font-bold">{patientSearch ? patientSearch.physician.name : <span className="font-light text-gray-400 text-app-small">Physician Name</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Degree:</div>
                                                    <Field type="hidden" name="physician.degree"  />
                                                    <div className="font-bold">{patientSearch ? patientSearch.physician.degree : <span className="font-light text-gray-400 text-app-small">Physician Degree</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Contact:</div>
                                                    <Field type="hidden" name="physician.contact"  />
                                                    <div className="font-bold">{patientSearch  ? patientSearch.physician.contact : <span className="font-light text-gray-400 text-app-small">Physician Contact</span> }</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] my-1 items-center gap-4">
                                                    <div className="text-app-small">Discipline:</div>
                                                    <Field type="hidden" name="physician.discipline"  />
                                                    <div className="font-bold">{patientSearch  ? patientSearch.physician.discipline : <span className="font-light text-gray-400 text-app-small">Physician Discipline</span> }</div>
                                                </div>
                                            </div>
                                            <div>
                                                <EditPhysician
                                                    button={
                                                        <PenLine className="cursor-pointer" size={18}/>
                                                    }
                                                />
                                            </div>
                                        </div>
                                        
                                        
                                        <Separator className="my-3 bg-black" />

                                        
                                        <div className="grid grid-cols-[100px_1fr_40px] mb-2 items-center gap-6">
                                            <h1 className="font-semibold text-app-base-lg">Referred By</h1>
                                            <AgentSearch/>
                                            <CreateAgent button={
                                                <Button variant={'default'}>
                                                <Plus size={20} className="cursor-pointer" />
                                                </Button>
                                            } />
                                        </div>
                                        <div className="grid grid-cols-[1fr_20px] bg-red-100 border-[1px] cursor-pointer border-red-300 rounded-lg px-2 py-2 shadow-md shadow-gray-400">
                                            <div className="flex flex-col gap-3 justify-evenly">
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Name:</div>
                                                    <Field type="hidden" name="agent.name"  />
                                                    <div className="font-bold">{patientSearch ? patientSearch.agent.name : <span className="font-light text-gray-400 text-app-small">Agent Name</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Contact:</div>
                                                    <Field type="hidden" name="agent.contact"  />
                                                    <div className="font-bold">{patientSearch ? patientSearch.agent.contact : <span className="font-light text-gray-400 text-app-small">Agent Contact</span>}</div>
                                                </div>
                                                <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                                                    <div className="text-app-small">Comission:</div>
                                                    <Field type="hidden" name="agent.comission"  />
                                                    <div className="font-bold">{patientSearch ? <>{patientSearch.agent.comission}{' %'}</>   : <span className="font-light text-gray-400 text-app-small">Agent Comission</span>}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <EditAgent
                                                    button={
                                                        <PenLine size={18} />
                                                    }
                                                />
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="grid justify-center gap-3 mt-4 border-t-2 border-gray-200 pt-4">
                                    <Button type="submit" variant={'default'} size={'sm'} className="!bg-blue-500 !text-white !px-12 !py-5 text-app-base-lg">Save</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default EditPatientForm;