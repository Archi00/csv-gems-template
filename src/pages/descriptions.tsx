import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import { reqOptions } from "@/utils/Appconfig"
import {  useEffect, useRef, useState } from "react"

export async function getServerSideProps() {
    let gems = {}
    const rawGems = await fetch(`http://localhost:3000/api/getGemsInfo`)
    const parsedGems = await rawGems.json()
    Object.values(parsedGems).map((gem: any) => {
        gems = {...gems, ...gem}
    })
    
    return {
      props: {gems}, 
    }
  }

const DescriptionsPage = ({gems}:any) => {
    const [currentSelected, setCurrentSelected] = useState<string>("")
    const [success, setSuccess] = useState<boolean | null>()
    const descriptionContainer = useRef<HTMLDivElement|null>(null)

    useEffect(() => {
        console.log(gems)
    }, [])
    
    const handleSelect = async (gemName: string) => {
        setCurrentSelected(gemName)
        const myContainer = document.createElement("div")
        myContainer.innerHTML = gems[gemName]
        myContainer.style.maxWidth = "80vw"
        myContainer.style.textAlign = "justify"
        myContainer.style.marginLeft = "auto"
        myContainer.style.marginRight = "auto"
        myContainer.contentEditable = "true"
        myContainer.className = "myContainer"
        descriptionContainer.current!.appendChild(myContainer)
    }

    const handleSave = async () => {
        const container = document.querySelector(".myContainer")!.innerHTML
        const endPoint = "/api/updateDescription"
        const post = reqOptions["post"]
        post.body = JSON.stringify({name: currentSelected, content: JSON.stringify(container)})
        const response = await fetch(endPoint, post)
        if (response.ok) setSuccess(true)
        return setTimeout(() => setSuccess(null), 2000)
    }

    const addGem = async () => {

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
                    <>
                        <button type="button" onClick={addGem} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Afegir una gemma</button>
                        <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                            {Object.keys(gems).map((gem, id: number) => {
                                return (
                                    <div key={id} className="min-w-[20vw] cursor-pointer text-center py-4 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleSelect(gem)}>
                                        {gem}
                                    </div>
                                )
                            })}
                        </div>  
                    </>
                :
                    <button type="button" onClick={handleSave} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualitzar</button>
                } 

            </div>
            { success === true ? 
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <span className="font-medium">Actualitzat correctament!</span>
                </div>
            : success === false ? 
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <span className="font-medium">Algo ha anat malament!</span> Truca a l'Albert!!
                </div>
            : null}
        </Main>
    )
}

export default DescriptionsPage