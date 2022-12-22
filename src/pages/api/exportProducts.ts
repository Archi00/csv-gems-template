import * as fs from "fs"
import {executePSQuery} from "@/utils/db"
import type { NextApiRequest, NextApiResponse } from "next"
type Data = {
    name: string
}

const metaComp = (gem: any) => {
	const ret: any = {}
	ret["id"] = gem["Product number"]
	ret["title"] = gem["Product name"].toLowerCase()
	ret["description"] = JSON.stringify(gem["Short description"]).replace("\n", "")
	ret["availability"] = JSON.stringify("in stock")
	ret["condition"] = "new"
	ret["price"] = Math.round(gem["Price"] + (gem["Price"] * 0.21))
	ret["link"] = `https://gemmesterra.com/Botiga/en/home/${gem["Product number"]}-${gem["Link"]}.html`
	ret["image_link"] = gem["Image URL"].split(",")[0]
	ret["brand"] = "Gemmesterra"
	return ret 
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
    	const file = fs.readFileSync(`src/utils/exportProducts.txt`, "utf8")
    	const result: any = await executePSQuery({query: file.toString(), values:[]})
		console.log(result)
    	const activeGems = result.filter((gem: any) => gem["Active"] == 1).map((gem: any) => metaComp(gem))
    	const data = JSON.stringify(activeGems, null, 4)
    	fs.writeFileSync(`public/assets/products/products.json`,data)
		const headers = Object.keys(activeGems[0]).join(";") + "\n"
		const values = activeGems.map((gem: any) => Object.values(gem).join(";"))
		const retCSV = headers + values.join("\n")
		fs.writeFileSync(`public/assets/datafeed/products_combinations_sql.csv`, retCSV)
		return res.status(200).json(JSON.parse(data))
	} catch (e: any) {
		console.log(e)	
		return e
	}
}
