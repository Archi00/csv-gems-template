import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import { makeDescriptionsCSV } from "@/utils/helpers"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const writeData = makeDescriptionsCSV(req.body["data"])
        //const nullData = `ID;Description\n${Object.keys(req.body["data"]).map(num => num + ";").join("\n")}`
        fs.writeFileSync(`src/tables/csv-exports/${req.body["lang"]}Description.csv`, writeData, "utf8")
        return res.status(200).json({message: 200})
    } catch(e) {
        console.error(e)
        return res.statusCode
    }
}