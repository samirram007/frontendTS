
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/form-input-field";

import { fetchAppModuleFeatureService } from "../../app_module_feature/data/api";
import type { AppModuleFeature } from "../../app_module_feature/data/schema";
import type { PermissionForm } from "../data/schema";



type Props = {
    form: UseFormReturn<PermissionForm>;
};
const AppModuleFetureDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: AppModuleFetureList, isLoading } = useQuery({
        queryKey: ["AppModuleFeture"],
        queryFn: fetchAppModuleFeatureService,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <FormInputField type='multiselect' form={form} name='appModuleFeatureId' label='Feature'
        items={
            AppModuleFetureList?.data.map((appModuleFeture: AppModuleFeature) => ({
                label: capitalizeAllWords(appModuleFeture.name),
                value: String(appModuleFeture.id),
            }))
        } />


}

export default AppModuleFetureDropdown