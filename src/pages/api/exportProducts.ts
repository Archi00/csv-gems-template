import * as fs from "fs"
import {executePSQuery} from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

const metaComp = (gem) => {
	const ret = {}
	ret["id"] = gem["Product number"]
	ret["title"] = gem["Product name"]
	ret["description"] = gem["Short description"]
	ret["availability"] = "in stock"
	ret["condition"] = "new"
	ret["price"] = "0"
	ret["link"] = gem["Link"]
	ret["image_link"] = gem["Image URL"].split(",")[0]
	ret["brand"] = "Gemmesterra"
	return ret 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const file = fs.readFileSync(`src/utils/exportProducts.txt`, "utf8")
    const result = await executePSQuery({query: file.toString(), values:[]})
    const activeGems = result.filter(gem => gem["Active"] == 1).map(gem => metaComp(gem))
    const data = JSON.stringify(activeGems, null, 4)
    fs.writeFileSync(`public/assets/products/products.json`,data)
    return res.status(200).json(JSON.parse(data))
}
