import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const file = fs.readFileSync(`src/gems/gemsInfo.json`, "utf8")
    const newFile = await JSON.parse(file)
    newFile.push(req.body)
    const writeFile = JSON.stringify(newFile, null, 4)
    fs.writeFileSync("src/gems/gemsInfo.json", writeFile, "utf8")
    return res.status(200).json(JSON.parse(writeFile))
}
