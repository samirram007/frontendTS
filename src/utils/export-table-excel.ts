import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { toSentenceCase } from './removeEmptyStrings'

export interface ExportColumn<T> {
    header: string
    accessor: keyof T
}

interface ExportToExcelProps<T> {
    title: string
    fileName: string
    columnData: ExportColumn<T>[]
    data: T[]
}

export default async function exportTableToExcel<T>({
    title,
    fileName,
    columnData: columns,
    data,
}: ExportToExcelProps<T>) {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(title)

    worksheet.columns = columns.map((col) => ({
        header: toSentenceCase(col.header),
        key: col.accessor as string,
        width: 20,
    }))

    data.forEach((row) => {
        const rowData: Record<string, any> = {}
        columns.forEach((col) => {
            rowData[col.accessor as string] = row[col.accessor]
        })
        worksheet.addRow(rowData)
    })

    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.autoFilter = {
        from: 'A1',
        to: `${String.fromCharCode(64 + columns.length)}1`,
    }

    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(
        new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        fileName,
    )
}