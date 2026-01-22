import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { toSentenceCase } from './removeEmptyStrings'

export default function exportTableToPdf<T extends Record<string, any>>({
    title,
    columnData: columns,
    data,
    fileName = 'table.pdf',
}: {
    title?: string
        columnData: { header: string; accessor: keyof T }[]
        data: T[]
    fileName?: string
}) {
    const doc = new jsPDF()

    // console.log(columns, '\n', data)

    if (title) {
        doc.setFontSize(14)
        doc.text(title, 14, 15)
    }

    autoTable(doc, {
        startY: title ? 22 : 14,
        head: [columns.map((c) => toSentenceCase(c.header))],
        body: data.map((row) => columns.map((c) => String(row[c.accessor] ?? ''))),
        styles: {
            fontSize: 9,
        },
        headStyles: {
            fillColor: [22, 160, 133],
        },
    })

    doc.save(fileName)
}