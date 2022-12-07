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

export const makeDescriptionsCSV = (table: any) => {
    let csvRows = ["ID;Description"]
    for (const [key, value] of Object.entries(table)) {
        csvRows.push(`${key};${value}`)
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

export const csvJSON = (csvText:string) => {
    let lines: string[] = [];
    const linesArray = csvText.split('\n');
    // for trimming and deleting extra space 
    linesArray.forEach((e: any) => {
        const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
        lines.push(row);
    });
    // for removing empty record
    lines.splice(lines.length - 1, 1);
    const result = [];
    const headers: any = lines[0]!.split(",");
    
    for (let i = 1; i < lines.length; i++) {
    
        const obj:any = {};
        const currentline = lines[i]!.split(",");
    
        for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

export const saveByteArray =  (data: any, name: string)  => {
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    console.log(typeof data)
    const blob = new Blob([data])
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = name
    a.click()
    window.URL.revokeObjectURL(url)
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export async function easyFetch(endpoint:string, req: RequestInit = {method: "POST", headers: {"Content-type": "application/json"}}) {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, req)
    const result = await response.json()
    console.log(result)
    return result
}
