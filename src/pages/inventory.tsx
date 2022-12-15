import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import {executeQuery} from "@/utils/db"
import { NextPageContext } from "next"
import { useState } from "react"
import AssetCard from "@/templates/AssetCard"
import Edit from "@/templates/Edit"
import { useRouter } from "next/router"

export async function getServerSideProps(_ctx: NextPageContext) {
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
    }
    assets.sort((a: any,b: any) => a.name.localeCompare(b.name))
    assets = JSON.stringify(assets)
    return { props: { assets } }
}

const Inventory = ({assets}:any ) => {
    const [onEdit, setOnEdit] = useState<{state: boolean, asset: any}>({
        state: false,
        asset: null, 
    })
    const router = useRouter()
        

    return (
        <Main
            meta={
                <Meta
                title="Inventory Page"
                description="Home Page for the inventory"
                ></Meta>
            }
            current="inventory"
        >
            <>
                <div className="mb-6 block m-auto text-center"><button onClick={() => router.push("/addAsset")} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Asset</button></div>
                <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                    {JSON.parse(assets).length > 0 && !onEdit.state
                        ? JSON.parse(assets).map((asset: any, id: number) => (
                            <AssetCard
                                key={id}
                                asset={asset}
                                title={asset.title}
                                onEdit={onEdit}
                                setOnEdit={setOnEdit}
                            />
                        ))
                        : null}
                    {JSON.parse(assets).length > 0 && onEdit.state ? (
                        <Edit asset={onEdit.asset} setOnEdit={setOnEdit} />
                    ) : null}
                </div>  
            </>
        </Main>
    )
}

export default Inventory
