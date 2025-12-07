import { GridTable } from "./components/data-table";
import { columns } from "./components/data-table-columns";
import { useGetTestSummaryReport } from "./data/queryOptions";



const DailyCollectionTestReport = () => {

    const { data } = useGetTestSummaryReport();
    return (
        <>
            <GridTable columns={columns} data={data?.data.data ?? []} />
        </>
    )
}


export default DailyCollectionTestReport;


