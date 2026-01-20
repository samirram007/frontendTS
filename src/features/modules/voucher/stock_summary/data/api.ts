import { getData } from "@/utils/dataClient";



const API_PATH = "/stock_summaries"

async function fetchStockSummaryService(type: string) {
    console.log('api called', `${API_PATH}/${type}`)
    return await getData(`${API_PATH}/${type}`);
}

export { fetchStockSummaryService };
