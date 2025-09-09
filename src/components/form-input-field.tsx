import { capitalizeAllWords, lowerCase } from "@/utils/removeEmptyStrings";
import type { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
    form: UseFormReturn<any>;
    type: 'text' | 'textarea' | 'checkbox';
    name: string;
    label: string;
    options?: { label: string; value: boolean | string }[];
}

const FormInputField = (props: Props) => {
    const { form, name, label, type, options } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2  '>
                        {label ?? capitalizeAllWords(name)}
                    </FormLabel>
                    <FormControl>
                        {type === 'textarea' ? <Textarea
                            className='resize-none col-span-4'
                            placeholder={`Add a ${name} to your entry`}
                            {...field}
                        /> :
                            (type === 'checkbox' ? (
                                <Input
                                    type='checkbox'
                                    className='col-span-1'
                                    checked={field.value === 'active' || field.value === true}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        const value = options && options.length > 0 ? (isChecked ? options[0].value : options[1]?.value || '') : isChecked;
                                        form.setValue(name, value);
                                    }}
                                />
                            )
                                :
                                <Input
                                    placeholder={'Enter ' + lowerCase(label ?? name)}
                                    className='col-span-4'
                                    autoComplete='off'
                                    {...field}
                                />
                            )

                        }


                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
            )}
        />
    )
}



export default FormInputField