import z from "zod";


const floorSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    status: z.string(),
    description: z.string(),
    floorNumber: z.number(),
});


export type Floor = z.infer<typeof floorSchema>;
export const floorSchemaList = z.array(floorSchema);
export type FloorList = z.infer<typeof floorSchemaList>;




export const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    description: z.string({ message: "Description is required" }),
    floorNumber: z.number(),
});

export type FloorForm = z.infer<typeof formSchema>;
