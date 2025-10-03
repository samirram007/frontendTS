


export function convertReportingDate(date:Date,duration:number):Date{
    const dateObj = new Date(date);
    const reportingDate: number = dateObj.setDate(dateObj.getDate() + duration);
    const reportingDuration = new Date(reportingDate);
    return reportingDuration;
}