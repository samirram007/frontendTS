
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


interface CreateAgentInterface{
  button: any
}


export default function CreateAgent({button}:CreateAgentInterface) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Agent</DialogTitle>
          <DialogDescription className="hidden">
            Agent Creation
          </DialogDescription>
        </DialogHeader>
          <Formik
            onSubmit={(_values,action)=>{
              setTimeout(() => {
                action.setSubmitting(false);
              }, 700);
            }}
            initialValues={{
              name:"",
              contact:"",
              comission:0
            }}
          >
            {()=>(
              <Form>
                <div className="grid grid-rows-1 gap-4 mb-5">
                  <InputBox placeholder="Referred By name" name="name" type="text" label="Name" />
                  <InputBox placeholder="0000-000-000" name="contact" type="text" label="Contact" />
                  <InputBox placeholder="0.00" name="comission" type="number" label="Comission" />
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
