import { toast } from "sonner";



class ErrorResponse{
    launchErrorToast(message:String){
        toast.error(message,{
            position:"top-right",
            richColors: true
        })
    }
}


export const ErrorToast = new ErrorResponse();

