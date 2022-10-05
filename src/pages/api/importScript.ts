import runScript from "@/utils/runScript"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        await runScript(`src/python/importScript.py`)
        return res.status(200).json({ message: 200})
    } catch(e) {
        console.log(e)
        return res.statusCode
    }

}
