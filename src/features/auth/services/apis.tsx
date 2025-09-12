import axiosClient from "@/utils/axios-client";
import { getData, postData } from "@/utils/dataClient";
import axios, { type AxiosResponse } from "axios";
import type { IUserProfileResponse } from "../interfaces/profile-interface";
import type { ILoginPayload } from "../interfaces/login-interface";


interface AuthResponse{
    status: string;
    success: boolean,
    message:string,
    code: number,
    errorCode:string
}





// export async function fetchUserProfileService() {
//     // console.log('loginService called', payload);

//     return await getData("/auth/profile")
// }


export async function fetchUserProfileService():Promise<AxiosResponse<IUserProfileResponse>>{
    try{
        const response = await axiosClient.get('/auth/profile');
        return response;
    }catch(error:unknown){
        if(axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<IUserProfileResponse>;
        }
        throw new Error("Network Error");
    }
}




export async function loginService(payload:ILoginPayload):Promise<AxiosResponse<AuthResponse>> {
    // console.log('loginService called', payload);
    try{
        const response = await axiosClient.post("/auth/login",payload);
        return response;
    }catch(error:unknown){
        if (axios.isAxiosError(error) && error.response){
            return error.response as AxiosResponse<AuthResponse>;
        }
        else{
            throw new Error("Network Error");
        }
    }
    // const data = await postData("/auth/login", payload)
    // console.log(data,"data after login process started");
    // return data;

    // return (await axiosClient.post("/auth/login", payload)).data
}
export async function logoutService() {
    // console.log('logoutService called');
    const data = await postData("/auth/logout", [])
    console.log(data);
    return data;
    //return  (await axiosClient.post("/logout", []))
}





