import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import { reqOptions } from "@/utils/Appconfig"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

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
    const [currentLanguage, setCurrentLanguage] = useState("es")
    const [newGemName, setNewGemName] = useState<string>("")
    const [newLang, setNewLang] = useState("es")
    const descriptionContainer = useRef<HTMLDivElement|null>(null)
    const addingDescription = useRef<HTMLTextAreaElement|null>(null)
    const router = useRouter()

    const handleSelect = async (gemName = currentSelected) => {
        setCurrentSelected(gemName)
        const probableContainer = document.querySelector(".myContainer")
        console.log(probableContainer)
        if (probableContainer) {
            descriptionContainer.current!.removeChild(probableContainer)
        }
        const myContainer = document.createElement("div")
        myContainer.innerHTML = gems[gemName][currentLanguage]
        myContainer.style.maxWidth = "80vw"
        myContainer.style.textAlign = "justify"
        myContainer.style.marginLeft = "auto"
        myContainer.style.marginRight = "auto"
        myContainer.contentEditable = "true"
        myContainer.className = "myContainer"
        descriptionContainer.current!.appendChild(myContainer)
        return void 0
    }

    useEffect((): any=> {
        if (currentSelected) {
            return handleSelect()
        } 
    }, [currentLanguage])


    const handleSave = async () => {
        const container = document.querySelector(".myContainer")!.innerHTML
        const endPoint = "/api/updateDescription"
        const post = reqOptions["post"]
        post.body = JSON.stringify({name: currentSelected, content: JSON.stringify(container), lang: currentLanguage},)
        const response = await fetch(endPoint, post)
        if (response.ok) setSuccess(true)
        return setTimeout(() => setSuccess(null), 2000)
    }

    const addGem = async () => {
        let duplicate: boolean | null
        const gemName = prompt("Escriu el nom de la gemma en Anglès")
        Object.keys(gems).map(gem=>{
            if (gem.toLowerCase() === gemName?.toLowerCase()) {
                return duplicate = true
            }
            return
        })
        if (duplicate!) return alert(`Ja hi ha descripció de ${gemName}!!`)
        return setNewGemName(gemName!.toLowerCase())
    }
    
    const handleAddDescription = async () => {
        const descriptionArray = addingDescription.current?.value.split("\n")
        const finalDescriptionArray: string[] = []
        descriptionArray?.map(part => {
            finalDescriptionArray.push(`<p>${part}</p>`)
        })
        const finalDescription = finalDescriptionArray.join("")
        const newObject = {[newGemName]: {[newLang]: finalDescription}}
        const endPoint = "/api/addNewGemDescription"
        const post = reqOptions["post"]
        post.body = JSON.stringify(newObject, null, 4)
        const response = await fetch(endPoint, post)
        if (response.ok) console.log("success")
    }

    const handleRouter = () => {
        router.push("/updateDescriptions")
    }

    const handleChangeLang = () => {
        if (currentLanguage === "es") {
            setCurrentLanguage("cat")
        }
        if (currentLanguage === "cat") {
            setCurrentLanguage("en")
        }
        if (currentLanguage === "en") {
            setCurrentLanguage("es")
        }
    }

    const handleSetNewLang = () => {
        if (newLang === "es") {
            setNewLang("cat")
        }
        if (newLang === "cat") {
            setNewLang("en")
        }
        if (newLang === "en") {
            setNewLang("es")
        }
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
            {currentSelected ? <div className="mb-6"><button onClick={handleChangeLang} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Current Language: {currentLanguage}</button></div>: null}
            <div ref={descriptionContainer}>
                {newGemName ? 
                <>
                    <div className="mb-6"><button onClick={handleSetNewLang} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Current Language: {newLang}</button></div>
                    <label className="mt-3 mb-6 text-center mx-auto block text-xl font-bold underline">{newGemName}</label>
                    <textarea
                      className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        mt-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                      "
                      placeholder="Descripció"
                      id="textArea"
                      ref={addingDescription}
                    ></textarea>
                    <button type="button" onClick={handleAddDescription} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>
                    </>
                : null}
                {!currentSelected && !newGemName ? 
                    <>
                        <button type="button" onClick={handleRouter} className="mt-8 text-center mx-auto text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Anar a la pàgina d&#39;estat</button>
                        <button type="button" onClick={addGem} className="mt-8 text-center mx-auto text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Afegir una gemma</button>
                        <div className="mx-auto mt-8 pb-4 flex flex-wrap max-w-[80vw] gap-1 justify-between">
                            {Object.keys(gems).sort().map((gem, id: number) => {
                                return (
                                    <>
                                    <div key={id} className="min-w-[15vw] cursor-pointer text-center py-4 px-6 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => handleSelect(gem)}>
                                        {gem}
                                    </div>
                                    </>
                                )
                            })}
                        </div>  
                    </>
                :
                    null
                } 

            </div>
            {!newGemName && currentSelected ? 
                <button type="button" onClick={handleSave} className="mt-8 text-center mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualitzar</button>
            : null}
            { success === true ? 
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                    <span className="font-medium">Actualitzat correctament!</span>
                </div>
            : success === false ? 
                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                    <span className="font-medium">Algo ha anat malament!</span> Truca a l&#39;Albert!!
                </div>
            : null}
        </Main>
    )
}

export default DescriptionsPage