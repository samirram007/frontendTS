// import { useEffect, useState } from "react";
import { GridTable } from "./components/data-table";
import { columns } from "./components/data-table-columns";
import { useGetTestSummaryReport } from "./data/queryOptions";
// import type { DailyCollectionReport } from "./data/schema";



const DailyCollectionTestReport = () => {

    // const [dailyCollectionData, setDailyCollectionData] = useState<DailyCollectionReport[]>([]);
    const { data } = useGetTestSummaryReport();

    // useEffect(() => {
    //     if (isSuccess && data.data) {
    //         const dailyCollection: DailyCollectionReport[] = data.data.data;

    //         const total_cash = data.data.data.reduce((acc, current) => acc.)

    //         // const dailyData = data.data.data.map((report) => {
    //         //     return{
    //         //         report.
    //         //     }
    //         // })
    //     }
    // }, [isSuccess, data]);


    return (
        <>
            <GridTable columns={columns} data={data?.data.data ?? []} />
        </>
    )
}


export default DailyCollectionTestReport;


