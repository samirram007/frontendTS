


export function convertReportingDate(date:Date,duration:number):Date{
    const dateObj = new Date(date);
    const reportingDate: number = dateObj.setDate(dateObj.getDate() + duration);
    const reportingDuration = new Date(reportingDate);
    return reportingDuration;
}




export const formatDateMonthYearForInput = (dateString: string | Date |  undefined | null) => {
    if (dateString == undefined || null) return;
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
};
