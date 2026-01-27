import z from "zod";




const roomSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    status: z.string(),
    description: z.string(),
    roomNumber: z.number(),
});


export type Room = z.infer<typeof roomSchema>;
export const roomSchemaList = z.array(roomSchema);
export type RoomList = z.infer<typeof roomSchemaList>;




export const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    description: z.string({ message: "Description is required" }),
    roomNumber: z.number(),
    isEdit: z.boolean()
});

export type RoomForm = z.infer<typeof formSchema>;
