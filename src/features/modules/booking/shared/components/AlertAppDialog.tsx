import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface IAlertAppDialog{
  name: React.ReactNode | string,
  title: string,
  description: string,
  onCancel?:()=> void,
  onSubmit?:()=> void,
  cancelText:string,
  submitText: string,
}

export const AlertAppDialog: React.FC<IAlertAppDialog> = ({
  name,title,description,onCancel,onSubmit,cancelText,submitText
}) =>{
  return(
    <>
      <AlertDialog>
        <AlertDialogTrigger>{name}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel} className="!bg-red-500 !text-white" >{cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit} className="!bg-green-500 !text-white">{submitText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}




