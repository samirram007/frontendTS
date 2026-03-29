import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { toSentenceCase } from './removeEmptyStrings'

const MAX_PDF_CELL_CHARS = 180

function formatPdfCellValue(value: unknown): string {
    const normalized = String(value ?? '').replace(/\s+/g, ' ').trim()

    if (normalized.length <= MAX_PDF_CELL_CHARS) {
        return normalized
    }

    return `${normalized.slice(0, MAX_PDF_CELL_CHARS - 1)}...`
}

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
        body: data.map((row) => columns.map((c) => formatPdfCellValue(row[c.accessor]))),
        styles: {
            fontSize: 9,
            overflow: 'ellipsize',
        },
        headStyles: {
            fillColor: [22, 160, 133],
        },
    })

    doc.save(fileName)
}