// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const file = fs.readFileSync(`src/tables/cat-table.json`, "utf8")
        const parsedFile = await JSON.parse(file)
        // parsedFile.map(gem => gem)
        // newFile.push(req.body)
        // const writeFile = JSON.stringify(newFile, null, 4)
        // fs.writeFileSync("src/tables/cat-table.json", writeFile, "utf8")
        // return res.status(200).json(JSON.parse(writeFile))
    } catch(e) {
      console.log(e)
      return e
    }
}
