import { z } from 'zod';

export const QuantityTypeSchema = z.union([
    z.literal('measure'),
    z.literal('volume'),
    z.literal('weight'),
    z.literal('length'),
    z.literal('area'),
    z.literal('others'),
])
export type QuantityType = z.infer<typeof QuantityTypeSchema>


export const QuantityTypeTypes = new Map<QuantityType, string>([
    ['measure', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['volume', 'bg-neutral-300/40 border-neutral-300'],
    ['weight', 'bg-neutral-300/40 border-neutral-300'],
    ['length', 'bg-neutral-300/40 border-neutral-300'],
    ['area', 'bg-neutral-300/40 border-neutral-300'],
    ['others', 'bg-neutral-300/40 border-neutral-300'],

])

