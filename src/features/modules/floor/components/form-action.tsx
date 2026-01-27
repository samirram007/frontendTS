// import { useNavigate } from "@tanstack/react-router";
import { formSchema, type Floor, type FloorForm } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeFloorService, udpateFloorService } from "../data/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Route as FloorRoute } from '@/routes/_protected/masters/infrastructure/_layout/floor/_layout';
import { lowerCase } from "@/utils/removeEmptyStrings";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/form-input-field";
import {
    Form
} from '@/components/ui/form'
import { useNavigate } from "@tanstack/react-router";
import StatusDropdown from "./dropdown/floor-status-dropdown";



interface Props {
    currentRow?: Floor
}





export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutateBuilding = useMutation({
        mutationFn: async (data: FloorForm) => {
            console.log("Building saving", data);
            if (isEdit && currentRow) {
                return await udpateFloorService({ ...data, id: currentRow.id });
            }
            else if (!isEdit) {
                return await storeFloorService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, "Building saved successfully");
            queryClient.invalidateQueries({ queryKey: ['buildings'] });
        },
    })

    const form = useForm<FloorForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow,
                isEdit,
            }
            : {
                name: "",
                code: "",
                status: "",
                description: "",
                floorNumber: 0,
                isEdit
            },
    });

    const moduleName = "floor";
    const onSubmit = (values: FloorForm) => {
        console.log(values, "values");
        form.reset();
        showSubmittedData(values);
        mutateBuilding.mutate(values, {
            onSuccess: () => {
                navigate({ to: FloorRoute.to, })
            }
        });
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
            <div className='-mr-4 h-[17.25rem] w-full overflow-y-auto py-1 pr-4'>
                <Form {...form}>
                    <form
                        id='user-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 p-0.5'
                    >
                        <FormInputField type='text' form={form} name='name' label='Name' />
                        <FormInputField type='text' form={form} name='code' label='Code' />
                        <StatusDropdown form={form} />
                        <FormInputField type='text' form={form} name='description' label='Description' />
                        <FormInputField type='text' form={form} name='floorNumber' label='Building Number' />
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