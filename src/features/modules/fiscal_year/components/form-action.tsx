'use client'

import { Button } from '@/components/ui/button'
import {
    Form
} from '@/components/ui/form'


import FormInputField from '@/components/form-input-field'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Route as FiscalYearRoute } from '@/routes/_authenticated/masters/organization/_layout/fiscal_year/_layout'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { companyQueryOptions } from '../../company/data/queryOptions'
import type { Company } from '../../company/data/schema'
import { defaultValues } from '../data/data'
import { useFiscalYearMutation } from '../data/queryOptions'
import { formSchema, type FiscalYear, type FiscalYearForm } from '../data/schema'
import CompanyDropdown from './dropdown/company-dropdown'
interface Props {
    currentRow?: FiscalYear
}

const formatDDMMMYYYY = (value: string | Date) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
export function FormAction({ currentRow }: Props) {

    const isEdit = !!currentRow
    const navigate = useNavigate();

    const { mutate: saveFiscalYear, isPending } = useFiscalYearMutation()
    const companyData = useSuspenseQuery(companyQueryOptions())
    const companyList = useMemo(() => {
        return companyData?.data?.data || [];
    }, [companyData]);
    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow,
                isEdit,
            }
            : defaultValues,
    })

    //  const fiscalyearStatusOptions: ActiveInactiveStatus[] = ['active', 'inactive'];

    const moduleName = "FiscalYear"
    //   const handleSaving = () => {
    //     // console.log('Form submitted', mainForm.getValues());
    //     createReceiptNote(mainForm.getValues())
    // }
    const onSubmit = (values: FiscalYearForm) => {
        form.reset()
        saveFiscalYear(
            currentRow ? { ...values, id: currentRow.id! } : values,
            {
                onSuccess: () => {
                    navigate({ to: FiscalYearRoute.to, })
                },
            }
        )

    }
    useEffect(() => {
        // console.log(form.watch('startDate'), form.watch('endDate'));
        const companyName = companyList?.find((c: Company) => c.id === form.watch('companyId'))?.name;
        const dateRange = `${formatDDMMMYYYY(form.watch('startDate'))} to ${formatDDMMMYYYY(form.watch('endDate'))}`;
        const name = (companyName ? `${companyName}` : '') + ': ' + dateRange;
        // console.log(name);
        form.setValue('name', name);
    }, [form.watch('companyId'), form.watch('startDate'), form.watch('endDate')])


    return (

        <Suspense fallback={<div>Loading...</div>}>
            <Dialog>
                <DialogHeader className='text-left'>
                    <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
                    <DialogDescription>
                        {form.watch('name')}

                    </DialogDescription>
                </DialogHeader>

                <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
                    <Form {...form}>
                        <form
                            id='user-form'
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 p-0.5'
                        >
                            <CompanyDropdown form={form} companyList={companyList} />
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <Label htmlFor="startDate">Start Date:</Label>
                                <DateBox form={form} name='startDate' />
                            </div>
                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <Label htmlFor="endDate">End Date:</Label>
                                <DateBox form={form} name='endDate' />
                            </div>

                            {/* <FormInputField type='text' form={form} name='name' label='Name' disabled /> */}
                            <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' },
                            ]} />






                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button type='submit' form='user-form' disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </Suspense>
    )
}


type DateBoxProps = {
    form: UseFormReturn<FiscalYearForm>,
    name: keyof FiscalYearForm
    tabIndex?: number
}

const DateBox = (props: DateBoxProps) => {
    const { form, name, } = props;
    const [displayValue, setDisplayValue] = useState<string | null>("");

    const parseAndFormatDate = (input: string): Date | null => {
        if (!input) return null;

        const now = new Date();
        const parts = input.split(/[./-]/).map(p => p.trim());

        let day = Number(parts[0]);
        let month = parts[1] ? Number(parts[1]) - 1 : now.getMonth(); // month index
        let year =
            parts[2] && parts[2].length === 2
                ? 2000 + Number(parts[2])
                : parts[2]
                    ? Number(parts[2])
                    : now.getFullYear();

        if (isNaN(day) || day < 1 || day > 31) return null;
        if (isNaN(month) || month < 0 || month > 11) return null;
        if (isNaN(year) || year < 1000) return null;

        return new Date(year, month, day);
    };
    const parseDate = () => {
        const parsed = parseAndFormatDate(displayValue!);
        if (parsed) {
            form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
            const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD/MM/YYYY
            setDisplayValue(formatted);
            const DBFormat = `${parsed.getFullYear()}-${(parsed.getMonth() + 1).toString().padStart(2, '0')}-${parsed.getDate().toString().padStart(2, '0')}`
            form.setValue(name, DBFormat, { shouldValidate: true, shouldDirty: true });
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            parseDate();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') {
            setDisplayValue("");
            form.setValue(name, null, { shouldValidate: true, shouldDirty: true });
            return;
        }
        setDisplayValue(e.target.value);

    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();

        parseDate();
        // if (parsed) {
        //     form.setValue(name, parsed, { shouldValidate: true, shouldDirty: true });
        //     const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, '-'); // DD/MM/YYYY
        //     setDisplayValue(formatted);
        //     const DBFormat = `${parsed.getFullYear()}-${(parsed.getMonth() + 1).toString().padStart(2, '0')}-${parsed.getDate().toString().padStart(2, '0')}`
        //     form.setValue(name, DBFormat, { shouldValidate: true, shouldDirty: true });
        // }
    };



    useEffect(() => {
        const formValue = form.watch(name);
        if (formValue) {
            let parsed: Date;

            if (typeof formValue === "string" || typeof formValue === "number") {
                parsed = new Date(formValue);
            } else if (formValue instanceof Date) {
                parsed = formValue;
            } else {
                return; // not a valid date type
            }

            if (!isNaN(parsed.getTime())) {
                const formatted = parsed.toLocaleDateString("en-GB").replace(/\//g, "-");
                setDisplayValue(formatted);
            }
        } else {
            setDisplayValue("");
        }
        parseDate();
    }, [form.watch(name)]);


    return (
        <>
            {/* {form.watch(name)} {displayValue} */}
            <Input
                type="text"
                placeholder="__-__-____"
                value={displayValue!}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            <span className="hidden">

                <FormInputField type='date' form={form}
                    label=''
                    noLabel
                    gapClass="grid-cols-[1fr] gap-0  "
                    name={name} />
            </span>
        </>
    )
}