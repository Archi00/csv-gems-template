import type { NextApiRequest, NextApiResponse } from "next"
import executeQuery from "@/utils/db"

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    let assets: any
    try {
        assets = await executeQuery({
            query: `
            SELECT * FROM bruts
            UNION
            SELECT * FROM cabs
            UNION
            SELECT * FROM especis
            UNION
            SELECT * FROM facets
            UNION
            SELECT * FROM lots
            `,
            values: [],
        })
    } catch (e: unknown) {
        assets = { message: e }
        console.error(e)
        return e
    }
    // assets.sort((a: any,b: any) => a.name.localeCompare(b.name))
    assets = JSON.stringify(assets)
    return res.status(200).json(assets)

}