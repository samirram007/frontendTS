import { ActiveInactiveStatusSchema } from '@/types/active-inactive-status';
import { z } from 'zod';




export const roleSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().min(1),
  status: ActiveInactiveStatusSchema,

})
export type Role = z.infer<typeof roleSchema>
export const roleListSchema = z.array(roleSchema)
export type RoleList = z.infer<typeof roleListSchema>



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
    isEdit: z.boolean(),
  })

export type RoleForm = z.infer<typeof formSchema>