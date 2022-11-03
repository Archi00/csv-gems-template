import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const file = fs.readFileSync(`src/tables/csv/products_combinations_sql.csv`)
    return res.status(200).json(file.toString())
}