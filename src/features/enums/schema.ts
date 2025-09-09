import { z } from "zod";

export const QuantityTypeEnum = z.enum([
    "measure",
    "volume",
    "weight",
    "length",
    "area",
    "others",
]);

export type QuantityType = z.infer<typeof QuantityTypeEnum>;