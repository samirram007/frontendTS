import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { capitalizeAllWords } from "@/utils/removeEmptyStrings"
import type { Control, UseFormReturn } from "react-hook-form"
type Option = { label: string; value: string | boolean };
type InputType = 'hidden' | 'text' | 'number' | 'textarea' | 'checkbox' | 'select' | 'multiselect' | 'date';
type Props = {
    form: UseFormReturn<any>;
    control?: Control<any>;
    type: InputType;
    name: string;
    label?: string;
    noLabel?: boolean;
    options?: Option[];
    items?: { label: string; value: string }[];
    gapClass?: string;
    disabled?: boolean;
    rtl?: boolean
    tabIndex?: number
    [key: string]: any;
}
const NarrationBox = (props: Props) => {
    const { form, name, gapClass, rtl, label, noLabel, ...rest } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'space-y-0 gap-0 items-start flex flex-col ',
                        gapClass
                    )}   >
                    {!noLabel &&
                        <FormLabel className={rtl ? 'order-last' : ''}>
                            {label ?? capitalizeAllWords(name)}
                        </FormLabel>
                    }
                    <FormControl>
                        <Textarea
                            className='resize-none   placeholder:italic placeholder:text-gray-400 bg-gray-600'
                            placeholder={`Add a ${name} to your entry`}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
            {...rest}
        />
    )
}

export default NarrationBox