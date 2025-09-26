import { z } from 'zod';
import type { formSchema } from "../data/schema";
export type AccountLedgerForm = z.infer<typeof formSchema>