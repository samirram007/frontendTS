import { getData } from "@/utils/dataClient";



const API_PATH = "/freights"

async function fetchFreightService(type: string) {

    return await getData(`${API_PATH}/${type}`);
}

export { fetchFreightService };
