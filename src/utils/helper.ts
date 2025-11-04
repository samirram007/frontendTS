export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatDateForInput = (date: Date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0") // months 0-11
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}