import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext, type KeyboardEvent } from "react"
import { useForm, type UseFormReturn } from "react-hook-form"
import { FocusTrap } from '../components/focus-trap'
import { formSchema, type ReceiptNote, type ReceiptNoteForm } from "../data/schema"


type FormContextType = UseFormReturn<ReceiptNoteForm>

const FormContext = createContext<FormContextType | null>(null)

export const useReceiptForm = () => {
    const ctx = useContext(FormContext)
    if (!ctx) throw new Error("useReceiptForm must be used inside FormProvider")
    return ctx
}

export const FormProvider = ({ children }: {
    children: React.ReactNode
}) => {

    const form = useForm<ReceiptNoteForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            voucherNo: "",
            voucherDate: new Date(),
            referenceNo: "",
            referenceDate: new Date(),
            voucherTypeId: 1,
            purchaseLedgerId: undefined,
            partyLedgerId: undefined,
            stockJournalId: null,
            remarks: "",
            stockJournal: {
                journalNo: "",
                journalDate: new Date(),
                voucherId: null,
                type: "",
                remarks: "",
                stockJournalEntries: [],
            },
            party: {
                id: 2,
                name: "SAM",
            },
            voucherEntries: [],
            isEdit: false,
        },
    })

    const handleEnterAsTab = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault() // prevent form submit

            const form = e.currentTarget.form
            if (!form) return

            const focusable = Array.from(
                form.querySelectorAll<HTMLElement>(
                    'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
                )
            ).filter((el) => el.tabIndex >= 0)

            const index = focusable.indexOf(e.currentTarget)
            if (index >= 0 && index < focusable.length - 1) {
                focusable[index + 1].focus()
            }
        }
    }

    const handleOnSubmit = (values: ReceiptNote) => {
        form.reset()
        console.log(values)


    }
    return (

        <div className="w-full grid grid-rows-[1fr_100px]  h-[calc(100dvh_-_200px)]">

            <Form {...form}   >

                <FormContext.Provider value={form}>
                    <FocusTrap>

                        <form onSubmit={form.handleSubmit(handleOnSubmit)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleEnterAsTab(e as any)
                            }}>
                            {children}
                        </form>
                    </FocusTrap>
                </FormContext.Provider>
            </Form>
        </div>
    )
}
