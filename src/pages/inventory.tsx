import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import { useState } from "react"

export async function getServerSideProps() {
    // const file = fs.readFileSync(`src/gems/prices.json`)
    // const prices = await JSON.parse(file.toString())
    
    return {
      props: {}, 
    }
}

const Inventory = ({prices}:any) => {
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
                title="Inventory Page"
                description="Home Page for the inventory"
                ></Meta>
            }
            current="inventory"
        >
            <>
                <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                </div>  
            </>
        </Main>
    )
}

export default Inventory