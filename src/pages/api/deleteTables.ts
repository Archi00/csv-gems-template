// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
    const catFile = fs.readFileSync(`src/tables/cat-table.json`, "utf8")
    const enFile = fs.readFileSync(`src/tables/en-table.json`, "utf8")
    const esFile = fs.readFileSync(`src/tables/es-table.json`, "utf8")

    const newCatFile = await JSON.parse(catFile)
    const newEnFile = await JSON.parse(enFile)
    const newEsFile = await JSON.parse(esFile)

    newCatFile.length = 0
    newEnFile.length = 0
    newEsFile.length = 0

    const writeCatFile = JSON.stringify(newCatFile)
    const writeEnFile = JSON.stringify(newEnFile)
    const writeEsFile = JSON.stringify(newEsFile)

    fs.writeFileSync("src/tables/en-table.json", writeEnFile, "utf8")
    fs.writeFileSync("src/tables/es-table.json", writeEsFile, "utf8")
    fs.writeFileSync("src/tables/cat-table.json", writeCatFile, "utf8")

    fs.readdirSync(`public/assets/images/gems`).forEach((file) => {
        fs.unlinkSync(`public/assets/images/gems/${file}`)
    })
    fs.readdirSync(`public/assets/images/compressed`).forEach((file) => {
        fs.unlinkSync(`public/assets/images/compressed/${file}`)
    })

    return res.status(200)
}
