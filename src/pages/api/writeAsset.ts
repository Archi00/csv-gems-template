// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import executeQuery from "../../utils/db"

type Data = {
    result: string | unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let result
    req.body = await JSON.parse(req.body)
    try {
        result = await executeQuery({
            query: `INSERT INTO ${req.headers.table} (gemid, name, size, origin, pes_kg, pes_gr, pes_ct, num_peces, num_capça, talla, color, preu_cost_pes, preu_cost, preu_estimat_pes, preu_estimat, pvp_pes, pvp, quantitat, qualitat, venta, urls, title, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            values: [
                req.headers["id"],
                req.body["nom"],
                req.body["mida"],
                req.body["origen"],
                req.body["pesKg"],
                req.body["pesGr"],
                req.body["pesCt"],
                req.body["numPeces"],
                req.body["numCapça"],
                req.body["talla"],
                req.body["color"],
                req.body["preuCostPes"],
                req.body["preuCost"],
                req.body["preuEstimatPes"],
                req.body["preuEstimat"],
                req.body["pvpPes"],
                req.body["pvp"],
                req.body["quantitat"],
                req.body["qualitat"],
                req.body["venta"],
                req.headers.imageurls,
                req.headers.table,
                req.body["comentaris"],
            ]!,
        })
    } catch (e: unknown) {
        result = e
        console.error(e)
    }
    res.status(200).json({ result })
}
