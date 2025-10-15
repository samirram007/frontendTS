
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import FormInputField from "@/components/form-input-field";
import { fetchAppModuleService } from "../../app_module/data/api";
import type { AppModule } from "../../app_module/data/schema";
import type { AppModuleFeatureForm } from "../types/types";



type Props = {
    form: UseFormReturn<AppModuleFeatureForm>;
};
const AppModuleDropdown = (props: Props) => {
    const { form } = props as Props;
    const { data: AppModuleList, isLoading } = useQuery({
        queryKey: ["AppModule"],
        queryFn: fetchAppModuleService,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <FormInputField type='select' form={form} name='appModuleId' label='Module'
        items={
            AppModuleList?.data.map((appModule: AppModule) => ({
                label: capitalizeAllWords(appModule.name),
                value: String(appModule.id),
            }))
        } />


}

export default AppModuleDropdown