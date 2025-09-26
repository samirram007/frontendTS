import { z } from 'zod';
import type { formSchema } from "../data/schema";
export type VoucherClassificationForm = z.infer<typeof formSchema>