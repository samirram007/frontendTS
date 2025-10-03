import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputBox } from "@/features/modules/booking/utils/components/InputBox";
import { Field, Form, Formik } from "formik";
import { useAgentMutation } from "./data/queryOptions";
import { agentSchema } from "./data/schema";
import { useAgent } from "./context/agent-context";
import { useState } from "react";

interface AgentFormInterface{
    button: React.ReactElement | string,
    action?: string,
}


const AgentForm: React.FC<AgentFormInterface> = ({button,action}) => {
    const [open,setOpen] = useState<boolean>(false);
    const {agentDetail} = useAgent();
    const {mutate,isPending} = useAgentMutation();

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
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
                            console.log("values", values);
                            mutate(values);
                            setTimeout(() => {
                                action.setSubmitting(false);
                                setOpen(false);
                            }, 700);
                        }}
                        validationSchema={agentSchema}
                        
                        initialValues={{
                            id: agentDetail?.id,
                            name: agentDetail?.name || "",
                            contactNo: agentDetail?.contactNo || "",
                            email: agentDetail?.email,
                            commissionPercent: agentDetail?.commissionPercent || 0.00,
                            accountLedgerId:0,
                            status: true
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