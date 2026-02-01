import { formSchema, type Bed, type BedForm } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeBedService, udpateBedService } from "../data/api";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { lowerCase } from "@/utils/removeEmptyStrings";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/form-input-field";


interface Props {
    currentRow?: Bed
}





export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const queryClient = useQueryClient();
    const mutateBed = useMutation({
        mutationFn: async (data: BedForm) => {
            console.log("Bed saving", data);
            if (isEdit && currentRow) {
                return await udpateBedService({ ...data, id: currentRow.id });
            }
            else if (!isEdit) {
                return await storeBedService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, "Bed saved successfully");
            queryClient.invalidateQueries({ queryKey: ['beds'] });
        },
    })

    const form = useForm<BedForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit ? {
            ...currentRow
        }
            :
            {
                name: '',
                code: '',
                status: '',
                description: '',
            }
    });

    const moduleName = "bed";
    const onSubmit = (values: BedForm) => {
        form.reset();
        showSubmittedData(values);
        mutateBed.mutate(values);
    }

    return (
        <Dialog>
            <DialogHeader className='text-left'>
                <DialogTitle>{isEdit ? 'Edit ' : 'Add New '} {moduleName}</DialogTitle>
                <DialogDescription>
                    {isEdit ? `Update the ${lowerCase(moduleName)} here. `
                        : `Create new ${lowerCase(moduleName)} here. `}
                    Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
                <Form {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 p-0.5'
                    >
                        <FormInputField type='text' form={form} name='name' label='Name' />
                        <FormInputField type='text' form={form} name='code' label='Code' />
                        <FormInputField type='checkbox' form={form} name='status' label='Status' options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]} />
                        <FormInputField type='text' form={form} name='description' label='Description' />
                        <FormInputField type='text' form={form} name='bedNumber' label='Bed Number' />
                    </form>
                </Form>
            </div>
            <DialogFooter>
                <Button type='submit' form='user-form'>
                    Save changes
                </Button>
            </DialogFooter>
        </Dialog>
    )
}