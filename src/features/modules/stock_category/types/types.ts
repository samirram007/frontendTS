import { z } from 'zod';
import type { formSchema } from "../data/schema";
export type StockCategoryForm = z.infer<typeof formSchema>