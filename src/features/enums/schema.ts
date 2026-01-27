import { z } from "zod";

export const QuantityTypeEnum = z.enum([
    "measure",
    "volume",
    "weight",
    "length",
    "area",
    "others",
]);


// Quantity Type
export type QuantityType = z.infer<typeof QuantityTypeEnum>;

export const UnitTypeEnum = z.enum([
    "simple",
    "compound"
]);
export type UnitType = z.infer<typeof UnitTypeEnum>;


// TypeOfSupplu
export const TypeOfSupplyEnum = z.enum([
    "capital_goods",
    "goods",
    "services",
]);
export type TypeOfSupply = z.infer<typeof TypeOfSupplyEnum>;

export const BuildingTypeEnum = z.enum([
    "main_hospital_block",
    "opd_block",
    "emergency_block",
    "icu_block",
    "ot_block",
    "lab_block",
    "diagnostic_block",
    "pharmacy_block",
    "admin_block",
    "hostel_quarters",
    "staff_quarters",
    "parking_block",
    "storage_warehouse",
    "laundry_block",
    "kitchen_cafeteria",
]);

export type BuildingType = z.infer<typeof BuildingTypeEnum>;