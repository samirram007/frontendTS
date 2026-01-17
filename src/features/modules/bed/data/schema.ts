import z from "zod";




const bedSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    status: z.string(),
    description: z.string(),
    bedNumber: z.number(),
});


export type Bed = z.infer<typeof bedSchema>;
export const bedSchemaList = z.array(bedSchema);
export type BedList = z.infer<typeof bedSchemaList>;




export const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    description: z.string({ message: "Description is required" }),
    bedNumber: z.number(),
});

export type BedForm = z.infer<typeof formSchema>;
