import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import fs from "fs"
import { useState } from "react"

export async function getServerSideProps() {
    const file = fs.readFileSync(`src/gems/prices.json`)
    const prices = await JSON.parse(file.toString())
    
    return {
      props: {prices}, 
    }
}

const PricesPage = ({prices}:any) => {
    const [dropdownSelected, setDropdownSelected] = useState<string>("")

    const handleDropdownSelect = (assetName: string) => {
        if (assetName == dropdownSelected) {
            return setDropdownSelected("")
        }
        setDropdownSelected(assetName)
    }

    

    return (
        <Main
            meta={
                <Meta
                title="Avg. Prices"
                description="Check avg. prices from GemSelect"
                ></Meta>
            }
            current="prices"
        >
            <>
                <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                    {Object.values(prices).sort().map((asset: any, id: number) => {
                        return (
                            <>
                            {asset ?
                                <div key={id} className="min-w-[15vw] cursor-pointer text-center py-4 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleDropdownSelect(asset["name"])}>
                                    <p>{asset["name"]}</p>
                                    <p>{asset["price"]}€/{asset["per"]}</p>
                                    {dropdownSelected == asset["name"] ?  <a href={asset["link"]}  rel="ext" className="w-full min-h-[2%] my-4 block">{asset["link"]}</a> : null}
                                    {dropdownSelected == asset["name"] ? 
                                    <>
                                        <div className="grid grid-cols-5 gap-4 mb-2">
                                            <div>Imatge</div>
                                            <div>Preu per {asset["per"]}</div>
                                            <div>Pes</div>
                                            <div>Mida</div>
                                            <div>Preu</div>
                                        </div>
                                        {Object.values(asset["more_list"]).sort((a: any,b: any) => {
                                            if (Math.round(a.weight.replace(",", ".")) < Math.round(b.weight.replace(",","."))) {
                                                return -1
                                            }
                                            return 1
                                            }).map((childAsset: any) => {
                                            return (
                                                <>
                                                    <div className="grid grid-cols-5 gap-4 my-4">
                                                        <div><img className="block m-auto" src={childAsset["image"]} alt={asset["name"]} loading="lazy" width={"30%"} height={"30%"}/></div>
                                                        <div>{(childAsset["price"] / childAsset["weight"].replace(",",".")).toFixed(2)}€/{asset["per"]}</div>
                                                        <div>{childAsset["weight"].replace(",",".")} {childAsset["per"]}</div> 
                                                        <div>({childAsset["size"]})</div> 
                                                        <div>{childAsset["price"]}€</div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </>
                                    : null}
                                </div>
                            : null}
                            </>
                        )
                    })}
                </div>  
            </>
        </Main>
    )
}

export default PricesPage