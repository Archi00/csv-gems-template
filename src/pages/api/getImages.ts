import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    let tmp = <any>[]
    const images = fs.readdirSync(`public/assets/images/gems`)
    images.forEach((file) => {
        tmp.push(file)
    })
    return res.status(200).json(tmp)
}
