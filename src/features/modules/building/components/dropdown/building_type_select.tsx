import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEnum } from "@/features/enums/api";
import { SelectDropdown } from "@/components/select-dropdown";
import type { BuildingType } from "@/features/enums/schema";
import { cn } from "@/lib/utils";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import type { UseFormReturn } from "react-hook-form";
import type { BuildingForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<BuildingForm>;
    gapClass?: string;
};

const BuildingTypeSelect = ({ form, gapClass }: Props) => {
    const isEdit = form.getValues("isEdit");
    const { data: buildingTypes } = useEnum("building_type_enum");

    return (
        <FormField
            control={form.control}
            name="buildingType"
            render={({ field }) => (
                <FormItem
                    className={cn(
                        "grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1",
                        gapClass
                    )}
                >
                    <FormLabel className="pt-1">Building Type</FormLabel>

                    <div className="w-full flex gap-2 flex-row items-center justify-start space-y-1">
                        <SelectDropdown
                            defaultValue={field.value ?? undefined}
                            onValueChange={(value) => field.onChange(value as BuildingType)}
                            placeholder="Select building type"
                            className={cn("w-full", isEdit && "cursor-not-allowed")}
                            disabled={isEdit}
                            items={(buildingTypes ?? []).map((buildingType: string) => ({
                                label: capitalizeAllWords(buildingType),
                                value: buildingType as BuildingType,
                            }))}
                        />
                    </div>

                    <FormMessage className="col-span-4 col-start-3" />
                </FormItem>
            )}
        />
    );
};

export default BuildingTypeSelect;
