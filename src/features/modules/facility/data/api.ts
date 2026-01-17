import { getData } from "@/utils/dataClient";



const API_PATH = "facilities";

export async function fetchFacilitiesService() {
    return await getData(API_PATH);
}