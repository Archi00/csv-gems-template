// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse<String>) {
    if (!req["headers"]["name"] || !req["headers"]["index"]) return res.status(404).json("No reference")
    const buf = Buffer.from(req.body, "base64")
    fs.writeFileSync(
        `public/assets/images/gems/${req["headers"]["name"]}-${req["headers"]["index"]}.jpeg`,
        buf
    )
    return res.status(200).json("Image Saved Successfully")
}
