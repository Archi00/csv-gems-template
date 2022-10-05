import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    const file: any = fs.readFileSync(`src/tables/en-table.json`, "utf8")
    return res.status(200).json(JSON.parse(file))
}
