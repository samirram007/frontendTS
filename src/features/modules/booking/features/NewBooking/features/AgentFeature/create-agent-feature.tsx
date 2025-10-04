import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputBox } from "@/features/modules/booking/utils/components/InputBox";
import { Field, Form, Formik } from "formik";
import { useAgentMutation } from "./data/queryOptions";
import { agentSchema } from "./data/schema";
import {  useState } from "react";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import type { IPatient } from "../CreatePatientFeature/data/schema";
import { useQueryClient } from "@tanstack/react-query";

interface AgentFormInterface{
    button: React.ReactElement | string,
    action?: string,
}


const AgentForm: React.FC<AgentFormInterface> = ({button,action}) => {
    const [open,setOpen] = useState<boolean>(false);
    const {patient,setPatient} = usePatient();
    const {mutate,isPending} = useAgentMutation();

    const queryClient = useQueryClient();

    return (
        <>
            <Dialog open={open} onOpenChange={(value)=>{
                setOpen(value);
                if(action != "Edit" && patient?.agent != undefined){
                    setPatient({...patient,agent: undefined});
                }
            }}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{action ?? "Add New Agent"}</DialogTitle>
                        <DialogDescription className="hidden">
                            Agent Creation
                        </DialogDescription>
                    </DialogHeader>
                    <Formik
                        onSubmit={(values, action) => {
                            mutate(values,{
                                onSuccess:(data)=>{
                                    if(data){
                                        setPatient((prev)=>{
                                            return prev ?
                                                {
                                                    ...prev,
                                                    agent: data.data.data
                                                }
                                                :
                                                { agent: data.data.data } as IPatient;
                                        });
                                        setOpen(false);
                                    }
                                    queryClient.invalidateQueries({ queryKey: ['get-agent-query'] })
                                }
                            });
                            setTimeout(() => {
                                action.setSubmitting(false);
                                
                            }, 500);
                        }}
                        validationSchema={agentSchema}
                        
                        initialValues={{
                            id: patient?.agent?.id,
                            name: patient?.agent?.name || "",
                            contactNo: patient?.agent?.contactNo || "",
                            email: patient?.agent?.email,
                            commissionPercent: patient?.agent?.commissionPercent || 0.00,
                            accountLedgerId: patient?.agent?.accountLedgerId || 0,
                            status: patient?.agent?.status || true
                        }}
                    >
                        {({}) => (
                            <Form>
                                <div className="grid grid-rows-1 gap-4 mb-5">
                                    <Field className="sr-only" name="id" />
                                    <InputBox placeholder="Referred By name" name="name" type="text" label="Name" />
                                    <InputBox placeholder="0000-000-000" name="contactNo" type="text" label="Contact" />
                                    <InputBox placeholder="agetn@gmail.com" name="email" type="text" label="Email" />
                                    <InputBox placeholder="0.00" name="commissionPercent" type="text" label="Comission" />
                                </div>

                                <Button type="submit" className="w-full !bg-blue-500">
                                    {isPending ? "Saving...." : "Save"}
                                </Button>
                            </Form>
                        )}
                    </Formik>



                </DialogContent>
            </Dialog>
        </>
    )
}


export default AgentForm;