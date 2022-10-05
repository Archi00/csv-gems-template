import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    const tmp = <any>{}
    fs.readdirSync(`public/assets/images/gems`).forEach((file) => {
        const data = fs.readFileSync(
            `public/assets/images/gems/${file}`
        )
        const baseData = data.toString("base64")
        tmp[file] = baseData
    })
    return res.status(200).json(tmp)
}
