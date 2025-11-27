import { useQuery } from "@tanstack/react-query"
import type { ITestSummaryRequest } from "./schema";
import { getAllDepartmentTestSummaryReport, getDepartmentTestSummaryReport } from "./api";




export const useGetTestSummaryReport = (request: ITestSummaryRequest) => {
    console.log("Request", request);
    return useQuery({
        queryKey: ['test-summary-report', request.startDate],
        queryFn: () => {
            if (request.departmentId) {
                return getDepartmentTestSummaryReport(request);
            }
            return getAllDepartmentTestSummaryReport(request);
        },
        retry: false,
        enabled: !!request.startDate && !!request.endDate && !!request.reportType
    });
}