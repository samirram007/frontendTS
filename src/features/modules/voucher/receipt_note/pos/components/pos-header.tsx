import FormInputField from "@/components/form-input-field";
import { Input } from "@/components/ui/input";
import { formatDateForInput } from "@/utils/helper";
import type { UseFormReturn } from "react-hook-form";
import { Label } from "recharts";
import PartyLedgerForm from "../../components/sub-component/party-ledger-form";
import PurchaseLedgerForm from "../../components/sub-component/purchase-ledger-form";
import type { ReceiptNoteForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<ReceiptNoteForm>;
}

const PosHeader = (props: Props) => {
    const { form } = props as Props;


    const voucherDate = form.watch("voucherDate")
    const inputValue = voucherDate
        ? formatDateForInput(new Date(voucherDate))
        : formatDateForInput(new Date()) // today in local timezone
    const dayName = voucherDate
        ? new Date(voucherDate).toLocaleDateString("en-US", { weekday: "long" })
        : ""


    return (
        <div className="grid grid-rows-1   ">
            <div className="grid grid-cols-[350px_1fr_200px]   border-0">

                <div className="space-y-0">
                    <div className="grid grid-cols-[120px_200px] gap-2 ">
                        <div className="bg-red-400 text-gray-100 px-2 shadow-md  ">Receipt Note</div>
                        <div>no:
                            <span className=" uppercase font-bold text-lg text-teal-800 underline underline-offset-2 decoration-1 pl-2 space-r-1">
                                {form.getValues('voucherNo') ?? 'new'}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[250px_300px] gap-6 pt-2">
                        <div className="grid grid-cols-[40px_200px]">
                            <FormInputField form={form} gapClass={"grid grid-cols-[90px_150px] gap-4"} type="text" name="referenceNo" label="Reference No." />
                        </div>
                        <div className="grid grid-cols-[110px_150px]">
                            <Label>Reference Date:</Label>

                            <Input
                                type="date"
                                {...form.register("referenceDate", {
                                    setValueAs: (value) => (value ? new Date(value) : null), // store as Date
                                })}
                                value={inputValue}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        form.setValue("referenceDate", new Date(e.target.value))
                                    }
                                }}
                            />
                        </div>
                    </div>

                </div>
                <div></div>
                <div className="grid grid-rows-2 gap-0 justify-end items-start ">

                    <div>

                        <Input
                            type="date"
                            {...form.register("voucherDate", {
                                setValueAs: (value) => (value ? new Date(value) : null), // store as Date
                            })}
                            value={inputValue}
                            onChange={(e) => {
                                if (e.target.value) {
                                    form.setValue("voucherDate", new Date(e.target.value))
                                }
                            }}
                        />
                        <div className="text-right text-sm font-bold">{dayName}</div>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pb-2">
                <div className="grid grid-rows-2 gap-2 items-center">
                    <PartyLedgerForm form={form} />
                    <PurchaseLedgerForm form={form} />

                </div>
                <div className="sm:hidden grid grid-cols-2 gap-2 items-center">
                    <div className="text-right">Cost Center: </div><Input type="text" />
                </div>
            </div>
        </div>
    )
}

export default PosHeader