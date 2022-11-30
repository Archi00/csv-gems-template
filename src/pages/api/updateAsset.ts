// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import executeQuery from "../../utils/db"

type Data = {
    result: string | unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let result
    let setQuery = ``
    for (let i = 0, l = Object.keys(req.body).length; i < l; i++) {
        setQuery += `${Object.keys(req.body)[i]} = "${Object.values(req.body)[i]}", `
    }
    setQuery = setQuery.substring(0, setQuery.length - 2)
    console.log(`UPDATE ${req.body.title} SET ${setQuery} WHERE gemid = ${req.body.gemid}`)

    try {
        result = await executeQuery({
            query: `UPDATE ${req.body.title} SET ${setQuery} WHERE gemid = ${req.body.gemid}`,
            values: [],
        })
    } catch (e: unknown) {
        result = e
        console.error(e)
    }
    console.log(result)
    res.status(200).json({ result })
}
