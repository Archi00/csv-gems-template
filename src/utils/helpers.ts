import JSZip from "jszip"
export const makeCSV = (table: any[]) => {
    let csvRows = []
    const headers = Object.keys(table[0]!)
    csvRows.push(headers.join(";"))
    for (let i = 0, l = table.length; i < l; i++) {
        const values = Object.values(table[i]!)
        csvRows.push(values.join(";"))
    }
    return csvRows.join("\n")
}

export const downloadCSVFile = (csv: any, filename: any) => {
    const csvFile = new Blob([csv], { type: "text/csv" })
    const downloadLink = document.createElement("a")

    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none"

    document.body.appendChild(downloadLink)

    downloadLink.click()
}

export const downloadZipFile = async (imgData: any, filename: any) => {
    const zip = new JSZip()
    for (const key in imgData) {
        zip.file(key, imgData[key], { base64: true })
    }

    const zipFile = await zip.generateAsync({ type: "blob" })
    const downloadLink = document.createElement("a")

    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(zipFile)
    downloadLink.style.display = "none"

    document.body.appendChild(downloadLink)

    downloadLink.click()
}

export const createImgUrl = (id: string, quantity: number | undefined) => {
    let tmp = []
    for (let i = 0; i < quantity!; i++) {
        const url = `https://www.gemmesterra.com/Botiga/upload/${id}-${i}.jpeg`
        tmp.push(url)
    }
    return tmp
}