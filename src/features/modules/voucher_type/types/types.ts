import { z } from 'zod';
import type { formSchema } from "../data/schema";
export type VoucherTypeForm = z.infer<typeof formSchema>