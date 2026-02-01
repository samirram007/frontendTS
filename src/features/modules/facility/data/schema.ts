import { z } from "zod";

const FacilityCategorySchema = z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    allows_patient_occupancy: z.boolean().optional(),
    allows_bed_assignment: z.boolean().optional(),
    allows_inventory_storage: z.boolean().optional(),
    allows_staff_assignment: z.boolean().optional(),
    requires_license: z.boolean().optional(),
    requires_temperature_ctrl: z.boolean().optional(),
    requires_infection_control: z.boolean().optional(),
    status: z.string(),
});

const FacilityTypeSchema = z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    allows_patient_occupancy: z.boolean().optional(),
    allows_bed_assignment: z.boolean().optional(),
    allows_inventory_storage: z.boolean().optional(),
    allows_staff_assignment: z.boolean().optional(),
    requires_license: z.boolean().optional(),
    requires_temperature_ctrl: z.boolean().optional(),
    requires_infection_control: z.boolean().optional(),
    status: z.string(),
});

const BuildingDetailsSchema = z.object({
    building_function: z.string(),
    no_of_floors: z.number(),
    year_constructed: z.number(),
    has_fire_clearance: z.boolean(),
    has_elevator: z.boolean(),
    has_power_backup: z.boolean(),
});

const FloorDetailsSchema = z.object({
    floor_number: z.number(),
    has_pharmacy: z.boolean().optional(),
    has_ward: z.boolean().optional(),
    restricted_access: z.boolean().optional(),
});

const RoomDetailsSchema = z.object({
    room_type: z.string(),
    room_class: z.string().optional(),
    max_beds: z.number(),
    gender_restriction: z.string().optional(),
    has_attached_bathroom: z.boolean().optional(),
    has_attendant_space: z.boolean().optional(),
    requires_infection_control: z.boolean().optional(),
});

const BedDetailsSchema = z.object({
    bed_type: z.string(),
    is_electric: z.boolean().optional(),
    has_oxygen_point: z.boolean().optional(),
    has_suction_point: z.boolean().optional(),
    has_monitoring: z.boolean().optional(),
    is_isolation_bed: z.boolean().optional(),
});

const BedSchema: z.ZodType<any> = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    parent_id: z.number(),
    status: z.string().optional().default("active"),
    description: z.string().optional(),
    bed_details: BedDetailsSchema.optional(),
    facility_category: FacilityCategorySchema.optional(),
    facility_type: FacilityTypeSchema.optional(),
});

const RoomSchema: z.ZodType<any> = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    description: z.string().optional(),
    parent_id: z.number(),
    status: z.string().optional().default("active"),
    facility_category: FacilityCategorySchema.optional(),
    facility_type: FacilityTypeSchema.optional(),
    room_details: RoomDetailsSchema.optional(),
    children: z.array(BedSchema).optional(), // beds
});

const FloorSchema: z.ZodType<any> = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    description: z.string().optional(),
    parent_id: z.number(),
    status: z.string().optional().default("active"),
    facility_category: FacilityCategorySchema.optional(),
    facility_type: FacilityTypeSchema.optional(),
    floor_details: FloorDetailsSchema,
    rooms: z.array(RoomSchema),
});

const FacilitySchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string(),
    description: z.string(),
    parent_id: z.null().optional(),
    status: z.string(),
    facility_category: FacilityCategorySchema,
    facility_type: FacilityTypeSchema,
    building_details: BuildingDetailsSchema,
    floors: z.array(FloorSchema),
});

const HospitalSchema = z.array(
    z.object({
        facility: FacilitySchema,
    })
);

export default HospitalSchema;

// const amenityCategorySchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     code: z.string(),
//     description: z.string(),
//     status: z.string()
// });


// const amenitySchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     code: z.string(),
//     status: z.string(),
//     amenityCategoryId: z.string(),
//     amenityCategory: amenityCategorySchema.nullable()
// });


const facilitySchema = z.object({
    id: z.string(),
    parentId: z.string().nullable(),
    facilitaybleId: z.string(),
    facilityableType: z.string(),
    amenities: z.any()
});


export type FacilityInterface = z.infer<typeof facilitySchema>;
export const facilityListSchema = z.array(facilitySchema);
export type FacilityList = z.infer<typeof facilityListSchema>;

export type IFacilityInterface = z.infer<typeof HospitalSchema>;



// {
//     "id": "cdff5255-c29c-4108-b4d7-a7ea1160dce7",
//         "name": "Wheelchair Access",
//             "code": "AMN_WHEELCHAIR_ACCESS",
//                 "status": "active",
//                     "amenityCategoryId": "cfeede7f-48e5-4bee-82e5-96d19cfc6763",
//                         "amenityCategory": {
//         "id": "cfeede7f-48e5-4bee-82e5-96d19cfc6763",
//             "name": "Accessibility",
//                 "code": "ACCESSIBILITY",
//                     "description": "Amenities ensuring barrier-free and inclusive access for all individuals",
//                         "status": "active"
//     }
// },