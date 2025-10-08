import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputBox } from "@/features/modules/booking/utils/components/InputBox";
import { Field, Form, Formik } from "formik";
import { physicianSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { useGetDisciplineListQuery, usePhysicianMutation } from "./data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";
import { usePatient } from "@/features/modules/booking/contexts/patient-context";
import type { IPatient } from "../CreatePatientFeature/data/schema";
import { SelectBox } from "@/features/modules/booking/utils/components/SelectBox";

interface ISelectOption{
    value: string,
    label: string
}



const PhysicianForm = ({button,action}:{button: string | React.ReactNode,action?:string}) => {

    const {data,isSuccess} = useGetDisciplineListQuery();

    const [displineList,setDisciplineList] = useState<ISelectOption[]>([]);
    const {setPatient,patient} = usePatient();
    const {mutate,isPending} = usePhysicianMutation();
    const [open,setOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    useEffect(()=>{
        if(isSuccess){
            let disciplineArr: ISelectOption[] = [];
            data.data.data.forEach(item=>{
                const disciplineObj:ISelectOption ={
                    value: `${item.id}`,
                    label: `${item.name}`
                };
                disciplineArr.push(disciplineObj);
            });
            setDisciplineList(disciplineArr);
        }
    },[isSuccess,data]);


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
                            const payload = {
                                ...values,
                                disciplineId: Number(values.disciplineId)
                            };
                            mutate(payload,{
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
                            id: action != "Edit" ? 0 : patient?.physician?.id,
                            name: action != "Edit" ? "" : patient?.physician?.name || "",
                            contactNo: action != "Edit" ? "" : patient?.physician?.contactNo || "",
                            accountLedgerId: action != "Edit" ? 0 : patient?.physician?.accountLedgerId || 0,
                            email: action != "Edit" ? undefined : patient?.physician?.email,
                            degree: action != "Edit" ? "" : patient?.physician?.degree || "",
                            disciplineId: action != "Edit" ? 0 : String(patient?.physician?.disciplineId) || 0,
                            status: action != "Edit" ? true : patient?.physician?.status || true,
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="grid grid-rows-1 mb-6 gap-4">
                                    <Field className="sr-only" name="id" />
                                    <InputBox placeholder="Physician name" name="name" type="text" label="Name" />
                                    <InputBox placeholder="0000-000-000" name="contactNo" type="text" label="Contact" />
                                    <InputBox placeholder="M.B.B.S" name="degree" type="text" label="Degree" />
                                    <SelectBox name="disciplineId" label="Discipline"
                                        options={displineList} 
                                    />
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