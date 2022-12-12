import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import { makeCSV } from "@/utils/helpers"

const createStructure = (props: any) => {
    const trStart = "<tr>"
    const thStart = "<th>"
    const trEnd = "</tr>"
    const thEnd = "</th>"
    const ret = []

    for (let i = 0; i < props.length; i++) {
        const header = thStart + Object.keys(props[i])[0]!  + thEnd
        const content = thStart + Object.values(props[i])[0]! + thEnd
        ret.push(trStart + header + trEnd + trStart + content + trEnd)
    }

    return ret.join("")
}

const createDescription = (parsedTable: any) => {
    const table = ["<table>"]
    const body = ["<tbody>"]
    const descs = parsedTable.map((t:any) => t.TestDescription).map((desc: any[]) => createStructure(desc))
    //const wtf = descs.map((desc: any[]) => createStructure(desc))

    body.push(descs)
    body.push("</tbody>")
    table.push(body.join(""))
    table.push("</table>")
    return table.join("")
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const enTable = fs.readFileSync("src/tables/en-table.json")
        const parsedEnTable = JSON.parse(enTable.toString())
        const esTable = fs.readFileSync("src/tables/es-table.json")
        const parsedEsTable = JSON.parse(esTable.toString())
        const catTable = fs.readFileSync("src/tables/cat-table.json")
        const parsedCatTable = JSON.parse(catTable.toString())
        
        const parsedEnTableDescription = createDescription(parsedEnTable)
        const parsedEsTableDescription = createDescription(parsedEsTable)
        const parsedCatTableDescription = createDescription(parsedCatTable)

        const enCSV =  makeCSV(parsedEnTable)
        const esCSV = makeCSV(parsedEsTable)
        const catCSV = makeCSV(parsedCatTable)

        fs.writeFileSync("src/tables/csv/enTable.csv", enCSV, "utf8")
        fs.writeFileSync("src/tables/csv/esTable.csv", esCSV, "utf8")
        fs.writeFileSync("src/tables/csv/catTable.csv", catCSV, "utf8")
    
        return res.status(200).json({message: 200})
    } catch(e) {
        console.error(e)
        return res.statusCode
    }
}