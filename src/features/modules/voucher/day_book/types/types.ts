import { z } from 'zod';
import type { formSchema } from "../data/schema";
export type DayBookForm = z.infer<typeof formSchema>