import axiosClient from "@/utils/axios-client";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { UserProfileResponse } from "./schema";





export async function fetchProfileService() {
    try {
        const response = await axiosClient.get('/auth/profile');
        return response;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response as AxiosResponse<UserProfileResponse>;
        }
        throw new Error("Axios network error");
    }
}