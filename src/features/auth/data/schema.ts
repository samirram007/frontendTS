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