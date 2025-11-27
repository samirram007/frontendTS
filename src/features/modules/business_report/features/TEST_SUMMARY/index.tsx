import { columns } from "./components/columns";
import { GridTable } from "./components/data-table";
import type { ITestSummaryReport } from "./data/schema";


interface ITestSummaryReportInterface {
    data: ITestSummaryReport[]
}



const TestSummaryReport: React.FC<ITestSummaryReportInterface> = ({ data }) => {
    return (
        <>
            <GridTable columns={columns} data={data} />
        </>
    )
}


export default TestSummaryReport;