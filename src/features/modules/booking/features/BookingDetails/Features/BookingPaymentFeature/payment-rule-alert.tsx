import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";







export function PaymentRuleAlertModal({action}:{action: string | React.ReactNode}) {

    const {totalAmount} = usePayment();
    const payableAmount = totalAmount/2;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {action}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Payment Rule</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>You have to make payment of (50%) to move to further process.</p>
                        <p>Your current due amount to move to further process is {Math.round(payableAmount)} </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}