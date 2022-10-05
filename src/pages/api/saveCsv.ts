import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import enTable from "../../tables/en-table.json"
import esTable from "../../tables/es-table.json"
import catTable from "../../tables/cat-table.json"
import { makeCSV } from "@/utils/helpers"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const enCSV =  makeCSV(enTable)
        const esCSV = makeCSV(esTable)
        const catCSV = makeCSV(catTable)
        fs.writeFileSync("src/tables/csv/enTable.csv", enCSV, "utf8")
        fs.writeFileSync("src/tables/csv/esTable.csv", esCSV, "utf8")
        fs.writeFileSync("src/tables/csv/catTable.csv", catCSV, "utf8")
    
        return res.status(200).json({message: 200})
    } catch(e) {
        console.error(e)
        return res.statusCode
    }
}