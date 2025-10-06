
import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/form-input-field";
import type { SupplierForm } from "../../data/schema";
import CountryDropdown from "../dropdown/country-dropdown";
import StateDropdown from "../dropdown/state-dropdown";




type FormProps = {
    form: UseFormReturn<SupplierForm>;
};
const AddressForm = (props: FormProps) => {
    const { form } = props as FormProps;
    const gapClass = "gap-4"  

    return (
        <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] gap-4 border rounded-lg p-2">
            <h3 className=" font-semibold text-lg  ">Address</h3>

            <div className="grid grid-rows-3 gap-4">
                <FormInputField type="text" gapClass={gapClass} form={form} name="address.line1" label="Address Line 1" />
                <FormInputField type="text" gapClass={gapClass} form={form} name="address.line2" label="Address Line 2" />
                <FormInputField type="text" gapClass={gapClass} form={form} name="address.landmark" label="Landmark" />

                <FormInputField type="text" gapClass={gapClass} form={form} name="address.city" label="City" />
                <StateDropdown form={form} gapClass={gapClass} />
                <CountryDropdown form={form} gapClass={gapClass} />

                <FormInputField type="text" gapClass={gapClass} form={form} name="address.postalCode" label="Postal Code" />
                <FormInputField type="checkbox" form={form} name="address.isPrimary" label="Is Primary Address?" />
            </div>

        </div>

    )
}

export default AddressForm