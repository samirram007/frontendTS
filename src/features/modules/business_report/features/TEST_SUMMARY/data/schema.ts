import type { IResponseInterface } from "@/features/modules/booking/data/schema"



export interface ITestSummaryRequest {
    startDate: string,
    endDate: string,
    departmentId?: number | null,
    reportType: string
}



export interface ITestSummaryReportTestDetail {
    testName: string,
    amount: string,
    status: string
}


export interface ITestSummaryReport {
    voucherNo: string,
    name: string,
    bookingDate: string | Date,
    totalAmount: number,
    tests: ITestSummaryReportTestDetail[]
}

export interface ITestSummaryReportCount {
    total_test: number,
    cancelled_test: string,
    cancellation_request: string,
    collect_specimen: string,
    test_to_be_confirm: string,
    report_under_process: string,
    delivery_pending: string,
    report_delivered: string
}

export interface ITestSummaryReportData {
    contents: ITestSummaryReport[],
    summary: ITestSummaryReportCount
}



export interface ITestSummaryReportResponse extends IResponseInterface {
    data: ITestSummaryReportData
}