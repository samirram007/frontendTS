import FormInputField from "@/components/form-input-field"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Loader } from "lucide-react"
import { Suspense, useEffect, useRef, useState } from "react"
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

import { voucherDispatchDetailSchema, type VoucherDispatchDetailForm } from "../../../delivery_note/data/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useVoucherDispatchDetailMutation } from "../../data/queryOptions"



type VoucherDispatchDetailFormProps = {
    voucherDispatchDefaultValues: VoucherDispatchDetailForm
}

const VoucherDispatchDetail = (prpos: VoucherDispatchDetailFormProps) => {
    const { mutate: saveVoucherDispatchDetail, isPending } = useVoucherDispatchDetailMutation();
    const dispatchRef = useRef<HTMLDivElement>(null);



    const [open, onOpenChange] = useState(false);
    const gapClass01 = 'grid grid-cols-[100px_200px] gap-4';
    const gapClass02 = 'grid grid-cols-[200px_200px] gap-4';
    const gapClass03 = 'grid grid-cols-[50px_100px] gap-4';
    const gapClass = 'grid grid-cols-[200px_1fr] gap-4';
    const voucherDisplayDispatchForm = useForm<VoucherDispatchDetailForm>({
        resolver: zodResolver(voucherDispatchDetailSchema) as Resolver<VoucherDispatchDetailForm>,
        defaultValues: prpos.voucherDispatchDefaultValues || undefined,
    });

    const handleOnClick = () => {
        const isValid = voucherDisplayDispatchForm.trigger();
        if (!isValid) {
            toast.error("Please fill all required fields")
            return;
        }
        const dispatchData = voucherDisplayDispatchForm.getValues();


        // Convert null values to undefined to match mutation type requirements
        const sanitizedData = {
            ...dispatchData,
            id: dispatchData.id === null ? undefined : dispatchData.id,
        };

        saveVoucherDispatchDetail(sanitizedData, {
            onSuccess: () => {
                toast.success("Dispatch details saved successfully");
                onOpenChange(false)
            },
            onError: (error) => {
                console.error("Failed to save dispatch details:", error);
                toast.error("Failed to save dispatch details");
            },
        });
    }


    return (
        <Suspense fallback={<Loader className="animate-spin" />}>
            <Dialog open={open}
                onOpenChange={(state) => {

                    onOpenChange(state)
                }} >
                <DialogTrigger asChild>

                    <div className='border-2 rounded px-2 flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 active:bg-gray-300' title='Dispatch Details'  >D</div>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[64rem]'>
                    <DialogHeader className='text-left border-b-2 pb-2'>
                        <VisuallyHidden>
                            <DialogTitle>Dispatch Details </DialogTitle>
                        </VisuallyHidden>
                        <DialogDescription>
                            Click Save changes to save your dispatch details.{voucherDisplayDispatchForm.watch('id')}
                        </DialogDescription>
                    </DialogHeader>
                    <div ref={dispatchRef} className='-mr-4 h-full w-full  overflow-y-auto py-1 pr-4'>
                        <Form {...voucherDisplayDispatchForm}>
                            <div className="flex flex-col justify-between gap-12 ">

                                <div className="space-y-2">
                                    <div className="text-center underline">Order Details</div>
                                    <div className="grid grid-cols-2 gap-12">
                                        <div>
                                            <FormInputField type='text' gapClass={gapClass01} form={voucherDisplayDispatchForm} name='orderNumber' label='Order Number' />

                                        </div>
                                        <div className="space-y-2">
                                            <FormInputField type='text' gapClass={gapClass} form={voucherDisplayDispatchForm} name='paymentTerms' label='Mode/terms of Payment' />
                                            <FormInputField type='text' gapClass={gapClass} form={voucherDisplayDispatchForm} name='otherReferences' label='Other references' />
                                            <FormInputField type='text' gapClass={gapClass} form={voucherDisplayDispatchForm} name='termsOfDelivery' label='Terms of Delivery' />
                                        </div>
                                    </div>

                                </div>
                                <div className="space-y-2 border-t-2 pt-1">
                                    <div className="text-center underline">Receipt Details</div>
                                    <div className="grid grid-cols-1 gap-12">
                                        <div className="space-y-2">
                                            <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='receiptDocNo' label='Receipt Doc No' />
                                            <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='dispatchedThrough' label='Dispatched Through' />
                                            <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='destination' label='Destination' />
                                            <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='carrierName' label='Carrier Name' />
                                            <div className="grid grid-cols-[1fr_1fr] gap-12">

                                                <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='billOfLadingNo' label='Bill of Lading/LR-RR No' />

                                                <div className={gapClass03}>

                                                    <Label>Date:</Label>
                                                    <DateBox tabIndex={1}
                                                        form={voucherDisplayDispatchForm} name="billOfLadingDate" />
                                                </div>
                                            </div>
                                            <FormInputField type='text' gapClass={gapClass02} form={voucherDisplayDispatchForm} name='motorVehicleNo' label='Motor Vehicle No' />

                                        </div>

                                    </div>




                                </div>

                            </div>



                        </Form>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleOnClick} className="h-8 focus:bg-black focus:text-white"
                            disabled={isPending}>
                            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </Suspense>
    )
}

export default VoucherDispatchDetail



type DateBoxProps = {
    form: UseFormReturn<VoucherDispatchDetailForm>,

    name: keyof VoucherDispatchDetailForm
    tabIndex?: number
}

const DateBox = (props: DateBoxProps) => {
    const { form, name, } = props;
    const [displayValue, setDisplayValue] = useState<string | null>("");

    const parseAndFormatDate = (input: string): Date | null => {
        if (!input) return null;

        const now = new Date();
        const parts = input.split(/[./-]/).map(p => p.trim());

        let day = Number(parts[0]);
        let month = parts[1] ? Number(parts[1]) - 1 : now.getMonth(); // month index
        let year =
            parts[2] && parts[2].length === 2
                ? 2000 + Number(parts[2])
                : parts[2]
                    ? Number(parts[2])
                    : now.getFullYear();

        if (isNaN(day) || day < 1 || day > 31) return null;
        if (isNaN(month) || month < 0 || month > 11) return null;
        if (isNaN(year) || year < 1000) return null;

        return new Date(year, month, day);
    };
    const parseDate = () => {
        const parsed = parseAndFormatDate(displayValue!);
        if (parsed) {
            form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
            const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD/MM/YYYY
            setDisplayValue(formatted);
            const DBFormat = `${parsed.getFullYear()}-${(parsed.getMonth() + 1).toString().padStart(2, '0')}-${parsed.getDate().toString().padStart(2, '0')}`
            form.setValue(name, DBFormat, { shouldValidate: true, shouldDirty: true });
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            parseDate();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') {
            setDisplayValue("");
            form.setValue(name, null, { shouldValidate: true, shouldDirty: true });
            return;
        }
        setDisplayValue(e.target.value);

    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();

        parseDate();
        // if (parsed) {
        //     form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
        //     const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD/MM/YYYY
        //     setDisplayValue(formatted);
        //     const DBFormat = `${parsed.getFullYear()}-${(parsed.getMonth() + 1).toString().padStart(2, '0')}-${parsed.getDate().toString().padStart(2, '0')}`
        //     form.setValue(name, DBFormat, { shouldValidate: true, shouldDirty: true });
        // }
    };



    useEffect(() => {
        const formValue = form.watch(name);
        if (formValue) {
            let parsed: Date;

            if (typeof formValue === "string" || typeof formValue === "number") {
                parsed = new Date(formValue);
            } else if (formValue instanceof Date) {
                parsed = formValue;
            } else {
                return; // not a valid date type
            }

            if (!isNaN(parsed.getTime())) {
                const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, "-");
                setDisplayValue(formatted);
            }
        } else {
            setDisplayValue("");
        }
        parseDate();
    }, [form.watch(name)]);


    return (
        <>
            {/* {form.watch(name)} {displayValue} */}
            <Input
                type="text"
                placeholder="__-__-____"
                value={displayValue!}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            <span className="hidden">

                <FormInputField type='date' form={form}
                    label=''
                    noLabel
                    gapClass="grid-cols-[1fr] gap-0  "
                    name={name} />
            </span>
        </>
    )
}