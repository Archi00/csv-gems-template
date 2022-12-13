import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.headers.data)
    const file: any = fs.readFileSync(`src/tables/${req.headers.data}-table.json`, "utf8")
    return res.status(200).json(JSON.parse(file))
}
