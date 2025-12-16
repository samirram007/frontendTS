import { SelectDropdown } from "@/components/select-dropdown";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { AccountNature } from "../../account_nature/data/schema";
import type { DeliveryRouteForm } from "../data/schema";
import { fetchDeliveryPlaceService } from "../../delivery_place/data/api";
import type { DeliveryPlace } from "../../delivery_place/data/schema";



type Props = {
    form: UseFormReturn<DeliveryRouteForm>;
    name: keyof DeliveryRouteForm;
    gapClass?: string;
};
const DeliveryPlaceDropdown = (props: Props) => {
    const { form, name, gapClass } = props as Props;
    const { data: deliveryPlaceList, isLoading } = useQuery({
        queryKey: ["deliveryPlaces"],
        queryFn: fetchDeliveryPlaceService,
    });

    // const placeId = form.watch(name) as string | number | undefined; // Watch  
    const handleValueChange = (value: string) => {
        form.setValue(name, Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1 '>
                        <FormLabel className='col-span-2 text-right mt-3'>
                            Accounting Group
                        </FormLabel>
                        <div className="w-full col-span-4 space-y-1">

                            <SelectDropdown
                                defaultValue={field.value ? field.value.toString() : ''}
                                onValueChange={(value) => handleValueChange(value)}
                                placeholder='Select an accounting group'
                                className='w-full col-span-6 md:col-span-4'
                                items={deliveryPlaceList?.data?.map((deliveryPlace: DeliveryPlace) => ({
                                    label: capitalizeAllWords(deliveryPlace.name),
                                    value: String(deliveryPlace.id),
                                }))}
                            />


                        </div>
                        <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                )}
            />
        </>

    )
}

export default DeliveryPlaceDropdown