// import { useNavigate } from "@tanstack/react-router";
import { formSchema, type Building, type BuildingForm } from "../data/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeBuildingService, udpateBuildingService } from "../data/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/utils/show-submitted-data";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Route as BuildingRoute } from '@/routes/_protected/masters/infrastructure/_layout/building/_layout';
import { lowerCase } from "@/utils/removeEmptyStrings";
import { Button } from "@/components/ui/button";
import FormInputField from "@/components/form-input-field";
import {
    Form
} from '@/components/ui/form'
import StatusDropdown from "./dropdown/building-status-dropdown";
import BuildingTypeSelect from "./dropdown/building_type_select";
import type { BuildingType } from "@/features/enums/schema";
import { useNavigate } from "@tanstack/react-router";



interface Props {
    currentRow?: Building
}





export function FormAction({ currentRow }: Props) {
    const isEdit = !!currentRow;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const mutateBuilding = useMutation({
        mutationFn: async (data: BuildingForm) => {
            console.log("Building saving", data);
            if (isEdit && currentRow) {
                return await udpateBuildingService({ ...data, id: currentRow.id });
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
    const gapClass = 'grid grid-cols-[200px_1fr]! gap-x-0   justify-start '

    const form = useForm<BuildingForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                ...currentRow,
                isEdit,
                buildingType: currentRow?.buildingType as BuildingType,
                icon: currentRow?.icon ?? undefined,
            }
            : {
                name: "",
                code: "",
                status: "",
                icon: undefined,
                buildingType: undefined,
                totalAreaSqft: '',
                coveredAreaSqft: '',
                yearOfConstruction: new Date().toISOString().slice(0, 10),
                sesmicZoneCompliance: false,
                structuralType: "",
                isEdit,
            },
    });

    const moduleName = "building";
    const onSubmit = (values: BuildingForm) => {
        console.log(values, "values");
        form.reset();
        showSubmittedData(values);
        mutateBuilding.mutate(values, {
            onSuccess: () => {
                navigate({ to: BuildingRoute.to, })
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
                        <BuildingTypeSelect form={form} gapClass={gapClass} />
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