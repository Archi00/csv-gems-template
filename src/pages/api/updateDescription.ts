import { GemsInfo } from "@/utils/GemsInfo"
import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const file = fs.readFileSync("src/utils/GemsInfo.ts")
    console.log(file)
    console.log(req.body)
    GemsInfo[req.body.name] = req.body.content
    console.log(GemsInfo[req.body.name])
    return res.status(200).json({name: "OK"})
}
