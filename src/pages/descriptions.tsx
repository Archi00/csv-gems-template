import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import { reqOptions } from "@/utils/Appconfig"
import { GemsInfo } from "@/utils/GemsInfo"
import {  useRef, useState } from "react"

const DescriptionsPage = () => {
    const [currentSelected, setCurrentSelected] = useState<string>("")
    const descriptionContainer = useRef<HTMLDivElement|null>(null)
    
    const handleSelect = (gemName: string) => {
        setCurrentSelected(gemName)
        const myContainer = document.createElement("div")
        myContainer.innerHTML = GemsInfo[gemName]
        myContainer.style.maxWidth = "80vw"
        myContainer.style.textAlign = "justify"
        myContainer.style.marginLeft = "auto"
        myContainer.style.marginRight = "auto"
        myContainer.contentEditable = "true"
        myContainer.className = "myContainer"
        descriptionContainer.current!.appendChild(myContainer)
    }

    const handleSave = async () => {
        const container = document.querySelector(".myContainer")!.textContent
        const endPoint = "/api/updateDescription"
        const post = reqOptions["post"]
        post.body = JSON.stringify({name: currentSelected, content: JSON.stringify(container)})
        await fetch(endPoint, post)
    }

    return (
        <Main
            meta={
                <Meta
                title="Gem Descriptions"
                description="Check and edit descriptions"
                ></Meta>
            }
            current="descriptions"
        >
            <div ref={descriptionContainer}>
                {!currentSelected ? 
                <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                    {Object.keys(GemsInfo).map((gem:string, id:number) => {
                        return (
                            <div key={id} className="min-w-[20vw] cursor-pointer text-center py-4 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleSelect(gem)}>
                                {gem}
                            </div>
                        )
                    })}
                </div>  
                :
                <button type="button" onClick={handleSave} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualitzar</button>
                } 

            </div>
        </Main>
    )
}

export default DescriptionsPage