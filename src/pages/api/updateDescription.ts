import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const file = fs.readFileSync("src/gems/gemsInfo.json").toString()
        const parsedFile = JSON.parse(file)
        parsedFile.map((gem: any) => {
            if(gem[req.body.name]){
                gem[req.body.name] = req.body.content
            }
        })
        const writeFile = JSON.stringify(parsedFile)
        fs.writeFileSync("src/gems/gemsInfo.json", writeFile, "utf8")
        return res.status(200).json({name: "OK"})
    } catch {
        return res.status(200).json({name: "NOT OK"})
    }
}
