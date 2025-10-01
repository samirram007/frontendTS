import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { capitalizeAllWords, capitalizeWords, lowerCase } from "@/utils/removeEmptyStrings";
import type { Control, UseFormReturn } from "react-hook-form";
import { SelectDropdown } from './select-dropdown';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
    form: UseFormReturn<any>;
    control?: Control<any>;
    type: 'text' | 'number' | 'textarea' | 'checkbox' | 'select' | 'date';
    name: string;
    label?: string;
    options?: { label: string; value: boolean | string }[];
    items?: { label: string; value: string }[];
    gapClass?: string
}

const FormInputField = (props: Props) => {
    const { type } = props

    //switch case for different input types
    if (type === 'checkbox') {
        return <CheckBox {...props} />
    }
    else if (type === 'textarea') {
        return <TextAreaBox {...props} />
    }
    else if (type === 'number') {
        return <NumberBox {...props} />
    }
    else if (type === 'select') {
        return <SelectBox {...props} />
    }
    else if (type === 'date') {
        return <DateBox {...props} />
    }
    else {
        return <TextBox {...props} />
    }

}



const CheckBox = (props: Props) => {
    const { form, name, label, type, options } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='grid grid-cols-[1fr_24px] items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='   '>
                        {label ?? capitalizeAllWords(name)} ?
                        <Badge variant={typeof (field.value) === 'string' ? 'default' : 'secondary'} className='ml-2'>
                            {typeof (field.value) === 'string' ? capitalizeWords(field.value) : field.value}
                        </Badge>
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            className=' w-6 h-6 '
                            checked={field.value === 'active' || field.value === true}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                const value = options && options.length > 0 ? (isChecked ? options[0].value : options[1]?.value || false) : isChecked;
                                form.setValue(name, value);
                            }}
                        />
                    </FormControl>
                    <FormLabel className=' col-start-2  '>


                    </FormLabel>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}

const TextAreaBox = (props: Props) => {
    const { form, name, label } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='grid grid-cols-[100px_1fr] items-start space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className=' pt-1  '>
                        {label ?? capitalizeAllWords(name)}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            className='resize-none   placeholder'
                            placeholder={`Add a ${name} to your entry`}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}

const TextBox = (props: Props) => {
    const { form, name, label, gapClass } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1',
                        gapClass
                    )} >
                    <FormLabel className='   '>
                        {label ?? capitalizeAllWords(name)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={'Enter ' + lowerCase(label ?? name)}
                            className=' placeholder'
                            autoComplete='off'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}
const DateBox = (props: Props) => {
    const { form, name, label, gapClass } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1',
                        gapClass
                    )} >
                    <FormLabel className='   '>
                        {label ?? capitalizeAllWords(name)} {field.value[name]}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={'Enter ' + lowerCase(label ?? name)}
                            type='text'
                            className=' placeholder'
                            autoComplete='off'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}
const NumberBox = (props: Props) => {
    const { form, name, label, type, gapClass } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        'grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1',
                        gapClass
                    )} >
                    <FormLabel className='   '>
                        {label ?? capitalizeAllWords(name)}
                    </FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={'Enter ' + lowerCase(label ?? name)}
                            className=' placeholder'
                            autoComplete='off'
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}

const SelectBox = (props: Props) => {
    const { form, name, label, items } = props
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='grid grid-cols-[100px_1fr] items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='   '>
                        {label ?? capitalizeAllWords(name)}
                    </FormLabel>
                    <FormControl>
                        <SelectDropdown
                            defaultValue={field.value ? field.value.toString() : ''}
                            onValueChange={(value) => form.setValue(name, value)}
                            placeholder={`Select a ${name}`}
                            className='w-full'
                            items={items}
                        />
                    </FormControl>
                    <FormMessage className=' col-start-2' />
                </FormItem>
            )}
        />
    )
}
export default FormInputField
export { CheckBox, NumberBox, SelectBox, TextAreaBox, TextBox };

