
import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { InputBox } from "../../utils/components/InputBox";
import { PathoContext } from "../../contexts/PathoContext";

export default function EditPhysician({button}:{button:any}) {

    const {patientSearch} = useContext(PathoContext);

  return (
    <Dialog>
      <DialogTrigger disabled={patientSearch != null ? false : true} className="border-0 outline-none ring-0">
        {button}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Physician Details</DialogTitle>
        </DialogHeader>
        <div>          
          <Formik
            onSubmit={(_values,actions)=>{
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 1000);
            }}
            initialValues={{
              id:patientSearch?.physician.id,
              name:patientSearch?.physician.name,
              contact:patientSearch?.physician.contact,
              degree:patientSearch?.physician.degree
            }}
          >
            {()=>(
              <Form>
                <div className="grid grid-cols-1 gap-8 mb-4">
                    <InputBox placeholder="Enter Patient name" type="text" name="name" label="Name" />
                    <InputBox placeholder="Enter patient phone number" name="contact" type="text" label="Contact" />
                    <InputBox placeholder="Enter patient age" type="text" name="degree" label="Degree" />
                    <InputBox placeholder="Enter patient discipline" type="text" name="discipline" label="Discipline" />
                  </div>
                <div className="grid  justify-center gap-3 mt-4 border-t-2 border-gray-200 pt-4">
                  <Button type="submit" variant={'default'} size={'lg'} className="!bg-blue-500 !px-12 !py-6 text-xl">Save & Use</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
