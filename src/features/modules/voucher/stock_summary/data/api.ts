import { getData } from "@/utils/dataClient";



const API_PATH = "/stock_summaries"

async function fetchStockSummaryService(type: string) {
    console.log('api called')
    return await getData(`${API_PATH}/${type}`);
}

export { fetchStockSummaryService };
