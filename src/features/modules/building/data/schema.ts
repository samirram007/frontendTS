import { BuildingTypeEnum } from "@/features/enums/schema";
import z from "zod";



const buildingSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    status: z.string(),
    icon: z.string(),
    buildingType: z.string(),
    totalAreaSqft: z.coerce.string(),
    coveredAreaSqft: z.coerce.string(),
    yearOfConstruction: z.string(),
    sesmicZoneCompliance: z.boolean(),
    structuralType: z.string(),
});


export type Building = z.infer<typeof buildingSchema>;
export const buildingSchemaList = z.array(buildingSchema);
export type BuildingList = z.infer<typeof buildingSchemaList>;





export const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    status: z.string().min(1, { message: "Status is required" }),

    icon: z.string().nullish(),

    buildingType: BuildingTypeEnum.nullish(),

    totalAreaSqft: z.string(),
    coveredAreaSqft: z.string(),

    yearOfConstruction: z.string().min(1, { message: "Year of construction is required" }),
    sesmicZoneCompliance: z.boolean(),
    structuralType: z.string().min(1, { message: "Structural type is required" }),

    isEdit: z.boolean(),
});

export type BuildingForm = z.infer<typeof formSchema>;