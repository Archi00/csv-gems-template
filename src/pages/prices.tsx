import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import fs from "fs"
import { useEffect, useState } from "react"

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
                                    {dropdownSelected == asset["name"] ? 
                                        Object.values(asset["more_list"]).map((childAsset: any) => {
                                            return (
                                                <>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div>{(childAsset["price"] / childAsset["weight"].replace(",",".")).toFixed(2)}€/{asset["per"]}</div>
                                                        <div>{childAsset["weight"].replace(",",".")} {childAsset["per"]}</div> 
                                                        <div>({childAsset["size"]})</div> 
                                                        <div>{childAsset["price"]}€</div>
                                                    </div>
                                                </>
                                            )
                                        })
                                        : null}
                                    {dropdownSelected == asset["name"] ?  <a href={asset["link"]} target="_blank" className="w-full min-h-[2%] mt-6 block">{asset["link"]}</a> : null}
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