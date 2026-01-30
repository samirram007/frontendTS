export interface UserProfileResponse {
    status: "success" | "error";
    message: string;
    data: UserProfileData;
}

export interface UserProfileData {
    id: number;
    name: string;
    email: string;
    username: string;
    userType: string;
    role: string;
    status: string;

    userFiscalYear: UserFiscalYear;
}

export interface UserFiscalYear {
    id: number;
    userId: string;
    fiscalYearId: string;
    fiscalYear: FiscalYear;
}

export interface FiscalYear {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    companyId: number;
    status: string;
}
import { roleListSchema } from '@/features/modules/role/data/schema';
import { userSchema } from '../../modules/user/data/schema';
import type z from 'zod';


export const userSchemaWithRole = userSchema.extend({
    roles: roleListSchema.optional(),

});

export type UserWithRole = z.infer<typeof userSchemaWithRole>;
