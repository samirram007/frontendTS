import { useNavigate } from "@tanstack/react-router";
import { formSchema, type Floor, type FloorForm } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeFloorService, udpateFloorService } from "../data/api";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { lowerCase } from "@/utils/removeEmptyStrings";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/form-input-field";


interface Props {
    currentRow?: Floor
}





export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const queryClient = useQueryClient();
    const mutateFloor = useMutation({
        mutationFn: async (data: FloorForm) => {
            console.log("Floor saving", data);
            if (isEdit && currentRow) {
                return await udpateFloorService({ ...data, id: currentRow.id });
            }
            else if (!isEdit) {
                return await storeFloorService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, "Floor saved successfully");
            queryClient.invalidateQueries({ queryKey: ['floors'] });
        },
    })

    const form = useForm<FloorForm>({
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
                floorNumber: 0
            }
    });

    const moduleName = "floor";
    const onSubmit = (values: FloorForm) => {
        form.reset();
        showSubmittedData(values);
        mutateFloor.mutate(values);
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
                        <FormInputField type='text' form={form} name='floorNumber' label='Floor Number' />
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