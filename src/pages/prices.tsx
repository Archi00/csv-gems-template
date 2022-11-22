import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import fs from "fs"
import { useEffect } from "react"

export async function getServerSideProps() {
    let prices = {}
    const file = fs.readFileSync(`src/gems/prices.json`)
    const parsedPrices = await JSON.parse(file.toString())
    Object.values(parsedPrices).map((price: any) => {
        prices = {...prices, ...price}
    })
    
    return {
      props: {prices}, 
    }
}

const PricesPage = ({prices}:any) => {
    useEffect(() => {
        console.log(prices)
    }, [])
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
                    {Object.keys(prices).sort().map((price, id: number) => {
                        return (
                            <>
                            <div key={id} className="min-w-[15vw] cursor-pointer text-center py-4 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <p>{price}</p>
                                <p>{prices[price]}€/{prices["per"]}</p>
                            </div>
                            </>
                        )
                    })}
                </div>  
            </>
        </Main>
    )
}

export default PricesPage