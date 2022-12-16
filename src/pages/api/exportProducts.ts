import * as fs from "fs"
import {executePSQuery} from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const file = fs.readFileSync(`src/utils/exportEverything.txt`, "utf8")
    const result = await executePSQuery({query: file.toString(), values:[]})
    const activeGems = result.filter(gem => gem["Active"] == 1)
    const data = JSON.stringify(activeGems, null, 4)
    fs.writeFileSync(`public/assets/products/products.json`,data)
    return res.status(200).json(JSON.parse(data))
}
