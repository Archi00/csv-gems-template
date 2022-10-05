import runScript from "@/utils/runScript"
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {

        let tmp = <any>[]
        fs.readdirSync(`public/assets/images/compressed`).forEach((file) => {
            tmp.push(file)
        })
        await runScript(`src/python/sendImages.py`)
        return res.status(200).json({ message: 200})
    } catch(e) {
        console.log(e)
        return res.statusCode
    }

}
