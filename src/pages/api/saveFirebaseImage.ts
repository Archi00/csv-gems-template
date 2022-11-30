import { getDownloadURL, getStorage, ref, uploadString } from "@firebase/storage"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<String | String[]>
) {
    try {
        let tmp: string[] = []
        const bucket = getStorage()
        for (let i = 0, l = req.body.length; i < l; i++) {
            const storageRef = ref(bucket, `${req.headers.id}-${i}.jpeg`)
            await uploadString(storageRef, req.body[i], "base64", {
                contentType: "image/jpeg",
            }).then(async (snapshot) => {
                const url = await getDownloadURL(snapshot.ref)
                return tmp.push(url)
            })
        }
        return res.send(tmp)
    } catch (e) {
        console.error(e)
        return res.send(e as string)
    }
}
