import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import { makeCSV, createDescription } from "@/utils/helpers"


export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const enTable = fs.readFileSync("src/tables/en-table.json")
        const parsedEnTable = JSON.parse(enTable.toString())
        const esTable = fs.readFileSync("src/tables/es-table.json")
        const parsedEsTable = JSON.parse(esTable.toString())
        const catTable = fs.readFileSync("src/tables/cat-table.json")
        const parsedCatTable = JSON.parse(catTable.toString())
        
        const parsedEnTableNewDescription = createDescription(parsedEnTable)
        const parsedEsTableNewDescription = createDescription(parsedEsTable)
        const parsedCatTableNewDescription = createDescription(parsedCatTable)

        const enCSV =  makeCSV(parsedEnTableNewDescription)
        const esCSV = makeCSV(parsedEsTableNewDescription)
        const catCSV = makeCSV(parsedCatTableNewDescription)

        fs.writeFileSync("src/tables/csv/enTable.csv", enCSV, "utf8")
        fs.writeFileSync("src/tables/csv/esTable.csv", esCSV, "utf8")
        fs.writeFileSync("src/tables/csv/catTable.csv", catCSV, "utf8")
    
        return res.status(200).json({message: 200})
    } catch(e) {
        console.error(e)
        return res.statusCode
    }
}