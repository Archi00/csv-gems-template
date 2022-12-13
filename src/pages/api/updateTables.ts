// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const file = fs.readFileSync(`src/tables/${req.headers.lang}-table.json`, "utf8")
        const parsedFile = await JSON.parse(file)
        console.log(parsedFile.map((e: any) => console.log(e["TestDescription"])))
        parsedFile.map((gem: any) => gem["ID"] == req.headers.id ? gem : null).map((gem: any) => (gem["TestDescription"] = req.body, gem["Price"] = req.headers.price))
        console.log(parsedFile.map((e: any) => console.log(e["TestDescription"])))
        const writeFile = JSON.stringify(parsedFile, null, 4)
        fs.writeFileSync(`src/tables/${req.headers.lang}-table.json`, writeFile, "utf8")
        return res.status(200).json(JSON.parse(writeFile))
    } catch(e) {
      console.log(e)
      return e
    }
}
