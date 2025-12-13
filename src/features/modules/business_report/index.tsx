import { useState } from "react";
import BusinessReportDropdownComboBox from "./components/business-report-ComboBox";
import { DateRangePicker, type DateRange } from "./components/datetime-picker-range";
import DepartmentComboBox from "./components/department-combobox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ITestSummaryRequest } from "./features/TEST_SUMMARY/data/schema";
import { useGetTestSummaryReport } from "./features/TEST_SUMMARY/data/queryOptions";
import TestSummaryReport from "./features/TEST_SUMMARY";
import DailyCollectionTestReport from "./features/DAILY_COLLECTION_REPORT";
import { dateUtil } from "@/utils/dateUtils";







const BusinessReport = () => {
    const [reportValue, setReportValue] = useState<string>("");
    const [reportStartDate, setReportStartDate] = useState<string>("");
    const [reportEndDate, setReportEndDate] = useState<string>("");
    const [testSummaryRequest, setTestSummaryRequest] = useState<ITestSummaryRequest>({
        startDate: "",
        endDate: "",
        reportType: ""
    });
    const { data } = useGetTestSummaryReport(testSummaryRequest);

    const handleRangeSelect = (range: DateRange) => {
        console.log(range);
        const startDate = dateUtil.formatToReportDate(range.from);
        const endDate = dateUtil.formatToReportDate(range.to);
        setReportStartDate(startDate);
        setReportEndDate(endDate);
        console.log(range);
    }

    const onHandleGetReport = () => {
        setTestSummaryRequest(() => {
            return {
                startDate: reportStartDate,
                endDate: reportEndDate,
                reportType: reportValue
            }
        })
    }

    console.log("Report value", reportValue);

    return (
        <div>
            <div>
                <div className="border-gray-300 border-b-2 font-semibold text-lg mb-4 py-4">Business Report</div>
                <div className="grid grid-cols-[1fr_250px] items-center justify-center gap-5">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Type of Report</Label>
                            <BusinessReportDropdownComboBox value={reportValue} setValue={setReportValue} />
                        </div>
                        {
                            Number(reportValue) == 9001 || Number(reportValue) == 9002 ?
                                <div className="flex flex-col gap-2"><Label>Department</Label> <DepartmentComboBox /></div> : ""
                        }
                    </div>


                    <div className="flex flex-col gap-2">
                        <Label>Period: </Label>
                        <DateRangePicker
                            onUpdate={(values) => handleRangeSelect(values.range)}
                            initialDateFrom={`${dateUtil.InitialDate()}`}
                            initialDateTo={`${dateUtil.YearEndDate()}`}
                            align="start"
                            locale="en-GB"
                            showCompare={false}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Button onClick={onHandleGetReport} className="px-8 py-5">Get Report</Button>
                </div>
            </div>
            {/* contents and Report */}
            {
                reportValue == "" ?
                    <div>No report type selected</div>
                    :
                    Number(reportValue) == 9005 ?
                        <div className="mt-6">
                            <DailyCollectionTestReport />
                        </div>
                        :
                        <div className="mt-6">
                            <TestSummaryReport data={data?.data ? data?.data?.data?.contents : []} />
                        </div>

            }

        </div>
    )
}



export default BusinessReport;