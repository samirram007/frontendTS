import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputBox } from "@/features/modules/booking/utils/components/InputBox";
import { Field, Form, Formik } from "formik";
import { physicianSchema } from "./data/schema";
import { useState } from "react";
import { usePhysician } from "./context/physician-context";
import { usePhysicianMutation } from "./data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import type { IPatient } from "../CreatePatientFeature/data/schema";





const PhysicianForm = ({button,action}:{button: string | React.ReactNode,action?:string}) => {

    const {physicianDetail,setPhysicianDetail} = usePhysician();
    const {setPatient} = usePatient();
    const {mutate,isPending} = usePhysicianMutation();
    const [open,setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    return (
        <>
            <Dialog open={open} onOpenChange={(value)=>{
                setOpen(value);
                if(value){
                    setPatient((prev)=>{
                        return prev &&
                            {
                                ...prev,
                            }
                    });
                }
            }}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>

                <DialogContent aria-description="Physician creation form used when Physician is not registered" className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{action ? action : "Add New Physician"}</DialogTitle>
                        <DialogDescription className="hidden">Physician Create form</DialogDescription>
                    </DialogHeader>
                    <Formik
                        onSubmit={(values, action) => {
                            mutate(values,{
                                onSuccess(data) {
                                    setPatient((prev)=>{
                                        return prev ?
                                            {
                                                ...prev,
                                                physician: data.data.data,
                                            }
                                            :
                                            { physician: data.data.data,
                                             } as IPatient;
                                    });
                                    setPhysicianDetail(data.data.data);
                                    queryClient.invalidateQueries({ queryKey: ['get-physician-query'] });
                                    setOpen(false);
                                },
                            });
                            setTimeout(() => {
                                action.setSubmitting(false);
                                
                            }, 400);
                        }}
                        validationSchema={physicianSchema}
                        initialValues={{
                            id: physicianDetail?.id,
                            name: physicianDetail?.name || "",
                            contactNo: physicianDetail?.contactNo || "",
                            accountLedgerId: physicianDetail?.accountLedgerId || 0,
                            email: physicianDetail?.email,
                            degree: physicianDetail?.degree || "",
                            disciplineId: physicianDetail?.disciplineId || 0,
                            status: physicianDetail?.status || true,
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="grid grid-rows-1 mb-6 gap-4">
                                    <Field className="sr-only" name="id" />
                                    <InputBox placeholder="Physician name" name="name" type="text" label="Name" />
                                    <InputBox placeholder="0000-000-000" name="contactNo" type="text" label="Contact" />
                                    <InputBox placeholder="M.B.B.S" name="degree" type="text" label="Degree" />
                                    <InputBox placeholder="Palentology" name="disciplineId" type="number" label="Discipline" />
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



export default PhysicianForm;