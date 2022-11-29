import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
    const prisma = new PrismaClient() as any
    try {
        // const query = await prisma.cat_tmp_gems.create({
        //     data: {
        //         "ID":"C852",
        //         "Active":1,"Categories":"2,16,18,120",
        //         "Price":"26",
        //         "Reference":"C852",
        //         "Quantity":1,"Name":"Ametista 1.84gr",
        //         "Description":"<table id=\"t01\"><tbody><tr><th id=\"product\">Detalls del producte</th></tr><tr><td id=\"type\">GEMMA</td><td>: <span>Ametista</span></td></tr><tr><td id=\"weight\">PES TOTAL</td><td>: <span>1.84gr</span></td></tr><tr><td id=\"size\">MIDES: (LxWxH)</td><td>: <span>16.6x11.9x5mm</span></td></tr><tr><td id=\"shape\">FORMA</td><td>: <span>Forma Lliure</span></td></tr><tr><td id=\"color\">COLOR</td><td>: <span>Violeta</span></td></tr><tr><td id=\"hardness\">DURESA</td><td>: <span>7</span></td></tr><tr><td id=\"origin\">ORIGEN</td><td>: <span>Brasil</span></td></tr><tr><td id=\"treatment\">TRACTAMENT</td><td id=\"unh\">:  Sense tractament</td></tr></tbody></table>",
        //         "ShortDescription":"<div>L'Ametista és una varietat violeta del quars. Es presenta en tota la gamma de violetes. De gairebé incolora a violeta fosc. Als millors exemplars té centelleigs de vermell i blau. Quan una ametista presenta un violeta fosc amb centelleigs se l'anomena comercialment de 'color siberià' ja que a Sibèria van sortir exemplars de gran bellesa.</div><div></div><div>Té duresa 7 de Mohs i es pot fer servir amb seguretat de durabilitat.</div><div></div><div>S'ha sinteritzat amb èxit amb molt d'encert i és molt difícil distingir la sintètica de la natural.</div><div></div><div>Un tant per cent molt alt de les que estan a la venda al mercat són sintètiques per això és una gemma que s'ha de comprar a un proveïdor de molta confiança.</div><div></div><div>Els jaciments principals són a: Uruguai, Brasil, Bolívia, Est d'Àfrica, Rússia.</div><div></div><div>A Catalunya van tenir molta importància les ametistes del Montseny (Barcelona).</div>",
        //         "meta_title":"Ametista 1.84gr - Gemmesterra",
        //         "meta_description":" Ametista 1.84gr de color violeta amb forma forma lliure (16.6x11.9x5mm) de Brasil - Sense tractaments",
        //         "imgUrls":["https://www.gemmesterra.com/Botiga/upload/C852-0.jpeg",
        //         "https://www.gemmesterra.com/Botiga/upload/C852-1.jpeg",
        //         "https://www.gemmesterra.com/Botiga/upload/C852-2.jpeg",
        //         "https://www.gemmesterra.com/Botiga/upload/C852-3.jpeg"]
        //     }
        // })
        const query = await prisma.cat_tmp_gems.create({data:{
            ID: "C852"
        } })
        console.log(query)
        return res.statusCode
    }
    catch(e) {
            console.log(e)
            return e
        }
}
