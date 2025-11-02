import type { IResponseInterface } from "@/features/modules/booking/data/schema";
import {z} from "zod";



export const discountSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  code: z.string().nullable(),
  isPercentage: z.boolean().nullable(),
  value: z.string().nullable(),
});

export type DiscountType = z.infer<typeof discountSchema>;
export const discountListSchema = z.array(discountSchema);
export type DiscountListType = z.infer<typeof discountListSchema>;



export interface IDiscountListResponse extends IResponseInterface{
    data: DiscountListType
}
export interface IDiscountResponse extends IResponseInterface{
    data: DiscountType
}