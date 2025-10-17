import { getData, postData } from "@/utils/dataClient";









export async function fetchUserProfileService() {

    return await getData("/auth/profile")
}
export async function loginService(payload: any) {
    const data = await postData("/auth/login", payload)
    return data;

    // return (await axiosClient.post("/auth/login", payload)).data
}
export async function logoutService() {
    const data = await postData("/auth/logout", [])
    return data;
    //return  (await axiosClient.post("/logout", []))
}





