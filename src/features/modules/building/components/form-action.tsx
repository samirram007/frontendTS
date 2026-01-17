// import { useNavigate } from "@tanstack/react-router";
import { formSchema, type Building, type BuildingForm } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeBuildingService, udpateBuildingService } from "../data/api";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { lowerCase } from "@/utils/removeEmptyStrings";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/form-input-field";
import {
    Form
} from '@/components/ui/form'
import StatusDropdown from "./dropdown/building-status-dropdown";



interface Props {
    currentRow?: Building
}





export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow
    const queryClient = useQueryClient();
    const mutateBuilding = useMutation({
        mutationFn: async (data: BuildingForm) => {
            console.log("Building saving", data);
            if (isEdit && currentRow) {
                return await udpateBuildingService({ ...data, id: currentRow });
            }
            else if (!isEdit) {
                return await storeBuildingService(data);
            }
        },
        onSuccess: (data) => {
            console.log(data, "Building saved successfully");
            queryClient.invalidateQueries({ queryKey: ['buildings'] });
        },
    })

    const form = useForm<BuildingForm>({
        resolver: zodResolver(formSchema) as Resolver<BuildingForm>,
        defaultValues: isEdit ? {
            ...currentRow, isEdit
        }
            :
            {
                name: '',
                code: '',
                status: '',
                icon: '',
                buildingType: '',
                totalAreaSqft: 0,
                coveredAreaSqft: 0,
                yearOfConstruction: new Date().toISOString().slice(0, 10),
                sesmicZoneCompliance: false,
                structuralType: '',
                isEdit,
            }
    });

    const moduleName = "building";
    const onSubmit = (values: BuildingForm) => {
        console.log(values, "values");
        form.reset();
        showSubmittedData(values);
        mutateBuilding.mutate(values);
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
            <div className='-mr-4 h-[30.25rem] w-full overflow-y-auto py-1 pr-4'>
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
                        <FormInputField type='text' form={form} name='buildingNumber' label='Building Number' />
                        <FormInputField type='text' form={form} name='buildingType' label='Building Type' />
                        <FormInputField type='number' form={form} name='totalAreaSqft' label='Total Square Foot' />
                        <FormInputField type='number' form={form} name='coveredAreaSqft' label='Covered Square Foot' />
                        <FormInputField type='date' form={form} name='yearOfConstruction' label='Year of construction' />
                        <FormInputField type='text' form={form} name='structuralType' label='Structural Type' />
                        <FormInputField type='checkbox' form={form} name='sesmicZoneCompliance' label='Sesmic Zone Compliance' options={[
                            { label: 'yes', value: true },
                            { label: 'No', value: false },
                        ]} />
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