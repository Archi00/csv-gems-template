import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const file = fs.readFileSync(`src/gems/gemsInfo.json`)
    const parsedFile = JSON.parse(file.toString())
    return res.status(200).json(parsedFile)
}