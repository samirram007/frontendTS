import { SelectDropdown } from "@/components/select-dropdown";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { capitalizeAllWords } from "@/utils/removeEmptyStrings";
import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import { fetchCurrencyService } from "../../../currency/data/api";
import type { Currency } from "../../../currency/data/schema";
import type { CompanyForm } from "../../data/schema";

type Props = {
    form: UseFormReturn<CompanyForm>;
}

const CurrencyDropdown = (props: Props) => {
    const { form } = props

    const { data: currencyList, isLoading } = useQuery({
        queryKey: ["currencies"],
        queryFn: fetchCurrencyService,
    });

    //const currencyId = form.watch('currencyId') as string | number | undefined;; // Watch form value for reactivity
    const handleValueChange = (value: string) => {
        form.setValue('currencyId', Number(value));

    };
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <FormField
            control={form.control}
            name='currencyId'
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                        Currency
                    </FormLabel>
                    <SelectDropdown
                        defaultValue={field.value ? field.value.toString() : ''}
                        onValueChange={(value) => handleValueChange(value)}
                        placeholder='Select a currency'
                        className='w-full col-span-6 md:col-span-4'
                        items={currencyList?.data.map((currency: Currency) => ({
                            label: capitalizeAllWords(currency.name),
                            value: String(currency.id),
                        }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}

export default CurrencyDropdown