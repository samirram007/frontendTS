import { z } from 'zod';
import { voucherTypeSchema } from '../../voucher_type/data/schema';



const voucherClassificationStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),])
export type voucherClassificationStatus = z.infer<typeof voucherClassificationStatusSchema>


export const voucherClassificationSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().optional(),
  status: voucherClassificationStatusSchema,
  voucherTypeId: z.number().int().positive().optional(),
  voucherType: voucherTypeSchema.optional(),
})
export type VoucherClassification = z.infer<typeof voucherClassificationSchema>

export const voucherClassificationListSchema = z.array(voucherClassificationSchema)
export type VoucherClassificationList = z.infer<typeof voucherClassificationListSchema>


export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' }),
    code: z
      .string()
      .min(1, { message: 'Role is required.' }),
    status: z
      .string()
      .min(1, { message: 'Status is required.' }),
    voucherTypeId: z.number().int().positive().min(1, { message: 'Voucher Type ID is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    isEdit: z.boolean(),
  })