// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let file
    try {
        file = fs.readFileSync(`src/tables/en-table.json`, "utf8")
    } catch {
        fs.writeFileSync("src/tables/en-table.json", "[]", "utf8")
        file = fs.readFileSync(`src/tables/en-table.json`, "utf8")
    }
    const newFile = await JSON.parse(file)
    newFile.push(req.body)
    const writeFile = JSON.stringify(newFile, null, 4)
    fs.writeFileSync("src/tables/en-table.json", writeFile, "utf8")
    return res.status(200).json(JSON.parse(writeFile))
}
