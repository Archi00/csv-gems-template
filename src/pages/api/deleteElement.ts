// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const catFile = fs.readFileSync(`src/tables/cat-table.json`, "utf8")
    const enFile = fs.readFileSync(`src/tables/en-table.json`, "utf8")
    const esFile = fs.readFileSync(`src/tables/es-table.json`, "utf8")

    const newCatFile = await JSON.parse(catFile)
    const newEnFile = await JSON.parse(enFile)
    const newEsFile = await JSON.parse(esFile)

    newCatFile.map((el: any, id: number) => {
        if (el["ID"] === req.body) {
            newCatFile.splice(id, 1)
        }
    })
    newEnFile.map((el: any, id: number) => {
        if (el["ID"] === req.body) {
            newEnFile.splice(id, 1)
        }
    })
    newEsFile.map((el: any, id: number) => {
        if (el["ID"] === req.body) {
            newEsFile.splice(id, 1)
        }
    })

    const writeCatFile = JSON.stringify(newCatFile)
    const writeEnFile = JSON.stringify(newEnFile)
    const writeEsFile = JSON.stringify(newEsFile)

    fs.writeFileSync("src/tables/en-table.json", writeEnFile, "utf8")
    fs.writeFileSync("src/tables/es-table.json", writeEsFile, "utf8")
    fs.writeFileSync("src/tables/cat-table.json", writeCatFile, "utf8")

    return res.status(200)
}
