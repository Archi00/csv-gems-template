import { createImgUrl } from "@/utils/helpers"
import * as fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
type Counter = {
    [key:string]: number
}
type Gem = {
    [key:string]: string | number | any
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
    const counter: Counter = {}
    const images = fs.readdirSync(`public/assets/images/compressed`)
    images.forEach(image => {
        const key: keyof Counter = image.split("-",1)[0]!
        if (counter.hasOwnProperty(key)) {
            counter[key] += 1
        } else {
            counter[key] = 1
        }
    })
    console.log(counter)
    const file = fs.readFileSync(`src/tables/cat-table.json`, "utf8")
    const parsedFile = JSON.parse(file)
    parsedFile.map((gem:Gem) => {
        gem.imgUrls = createImgUrl(gem.Reference, counter[gem.Reference])
        gem.imgAlts = Array(counter[gem.Reference]).fill(gem.Name).join(",")
    })
    const writeFile = JSON.stringify(parsedFile, null, 4)
    fs.writeFileSync("src/tables/cat-table.json", writeFile, "utf8")
    return res.status(200).send("Images Set!")
}