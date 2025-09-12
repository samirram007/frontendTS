


export interface IUserProfileResponse{
    status: string,
    message: string,
    data: {
        id: number,
        name: string,
        email: string,
        username: unknown,
        userType: string,
        role: string,
        contactNo: unknown | string
    },
    success: boolean,
    code: number,
    errorCode: string
}




export interface IUserDetail{
    id: number,
    name: string,
    email: string,
    username: unknown,
    userType: string,
    role: string,
    contactNo: unknown | string
}