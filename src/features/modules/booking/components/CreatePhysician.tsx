import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { InputBox } from "../utils/components/InputBox";

export default function CreatePhysician({button}:{button:any}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>

      <DialogContent aria-description="Physician creation form used when Physician is not registered"  className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Physician</DialogTitle>
          <DialogDescription className="hidden">Physician Create form</DialogDescription>
        </DialogHeader>
          <Formik
            onSubmit={(values,action)=>{
              console.log("values: ",values);
              setTimeout(() => {
                action.setSubmitting(false);
              }, 700);
            }}

            initialValues={{
              name:"",
              contact:"",
              degree:"",
              discipline:""
            }}
          >
              {()=>(
                <Form>
                  <div className="grid grid-rows-1 mb-6 gap-4">
                    <InputBox placeholder="Physician name" name="name" type="text" label="Name" />
                    <InputBox placeholder="0000-000-000" name="contact" type="text" label="Contact" />
                    <InputBox placeholder="M.B.B.S" name="degree" type="text" label="Degree" />
                    <InputBox placeholder="Palentology" name="discipline" type="text" label="Discipline" />
                  </div>
                  <Button type="submit" className="w-full !bg-blue-500">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
         
      </DialogContent>
    </Dialog>
  );
}
