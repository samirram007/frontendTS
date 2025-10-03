import { z } from 'zod';




export const contraSchema = z.object({
  id: z.number().int().positive().nullish(),
  name: z.string().min(1), 
  code: z.string().min(1),


})
export type Contra = z.infer<typeof contraSchema>
export const contraListSchema = z.array(contraSchema)
export type ContraList = z.infer<typeof contraListSchema>



export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required.' }),
    code: z
      .string()
      .min(1, { message: 'Role is required.' }),

    isEdit: z.boolean(),
  })

export type ContraForm = z.infer<typeof formSchema>