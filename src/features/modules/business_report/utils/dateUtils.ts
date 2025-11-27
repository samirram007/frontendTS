


class DateUtil {
    InitialDate(): string {
        const currentDate = new Date();
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const formattedDate = `${year}-${month}-${date}`;
        return formattedDate;
    }

    YearEndDate(): string {
        const currentDate = new Date();
        const endOfYearDate = new Date(currentDate.getFullYear(), 12, 0, 23, 59, 59);
        const date = endOfYearDate.getDate();
        const month = endOfYearDate.getMonth();
        const year = endOfYearDate.getFullYear();
        const formattedDate = `${year}-${month}-${date}`;
        return formattedDate;
    }


    formatToReportDate(selectedDate: Date | undefined): string {
        const date = selectedDate == undefined ? new Date() : new Date(selectedDate);
        const formattedDate = new Date(date).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        return formattedDate;
    }
}


export const dateUtil = new DateUtil();