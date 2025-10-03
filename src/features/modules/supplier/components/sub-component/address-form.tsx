
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/form-input-field";
import { fetchStateService } from "@/features/modules/state/data/api";
import type { SupplierForm } from "../../data/schema";
import CountryDropdown from "../dropdown/country-dropdown";
import StateDropdown from "../dropdown/state-dropdown";




type FormProps = {
    form: UseFormReturn<SupplierForm>;
};
const AddressForm = (props: FormProps) => {
    const { form } = props as FormProps;
    const { data: states, isLoading } = useQuery({
        queryKey: ["states"],
        queryFn: fetchStateService,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="grid grid-cols-2 gap-4 border rounded-lg p-4 mt-4">
            <h3 className="col-span-2 font-semibold text-lg mb-2">Address</h3>

            <FormInputField
                type="text"
                form={form}
                name="address.address_line1"
                label="Address Line 1"
            />
            <FormInputField
                type="text"
                form={form}
                name="address.address_line2"
                label="Address Line 2"
            />
            <FormInputField
                type="text"
                form={form}
                name="address.landmark"
                label="Landmark"
            />
            <FormInputField
                type="text"
                form={form}
                name="address.city"
                label="City"
            />
            <CountryDropdown form={form} />
            <StateDropdown form={form} />

            <FormInputField
                type="text"
                form={form}
                name="address.postal_code"
                label="Postal Code"
            />
            <FormInputField
                type="checkbox"
                form={form}
                name="address.is_primary"
                label="Is Primary Address?"
            />
        </div>

    )
}

export default AddressForm