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

export const ProcessTypeEnum = z.enum([
    "inhouse",
    "outsource",
]);
export type ProcessType = z.infer<typeof ProcessTypeEnum>;