import { Meta } from "@/layouts/Meta"
import { Main } from "@/templates/Main"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { translations } from "@/utils/Translations"
import { useState } from "react"

export async function getServerSideProps() {
    let gems = {}
    const rawGems = await fetch(`http://localhost:3000/api/getGemsInfo`)
    const gemsToUpdate = await fetch(`http://localhost:3000/api/getDescriptionsCSV`)
    const parsedGemsToUpdate = await gemsToUpdate.json()
    const parsedGems = await rawGems.json()
    Object.values(parsedGems).map((gem: any) => {
        gems = {...gems, ...gem}
    })
    
    return {
      props: {gems, parsedGemsToUpdate}, 
    }
}

const UpdateDescriptions = ({gems, parsedGemsToUpdate}: any) => {
    const [missingDescription, setMissingDescription] = useState<any>()
    const handleUpdate = () => {
        let currentGems: any = {}
        let tmp: any = {}
        let returnObject: any = {}
        const outputGems = parsedGemsToUpdate.split("\n")
        outputGems.map((gem: any) => {
            const formatedGem = gem.split(",")
            if (!formatedGem[1]) return 
            const cleanFormatedGem = formatedGem[1].toLowerCase().replace(`"`, "")
            const cleanPendant = cleanFormatedGem.replace("collar de ", "")
            const cleanedPendant = cleanPendant.replace("collar", "")
            const cleanMoon = cleanedPendant.replace("  lluna", " luna")
            const cleanColgante = cleanMoon.replace("colgante  ", "")
            const cleanMoonPendant = cleanColgante.replace("colgante ", "")
            const cleanNatural = cleanMoonPendant.replace(" natural", "")
            const cleanCoral = cleanNatural.replace(" rojo mediterrano", "")
            const cleanEthipia = cleanCoral.replace(" etiopia", "")
            const cleanBiterminated = cleanEthipia.replace(" biterminado", "")
            const cleanPulsera = cleanBiterminated.replace("pulsera ", "")
            const cleanCarved = cleanPulsera.replace(" labrado", "")
            const cleanDoubleCarved = cleanCarved.replace(" labrada", "")
            const cleanRed = cleanDoubleCarved.replace("rojo", "")
            const cleanCoralUpdate = cleanRed.replace("coral ", "coral")
            const cleanEarrings = cleanCoralUpdate.replace("pendientes ", "")
            const cleanMedalion = cleanEarrings.replace("aguja ", "")
            const cleanRing = cleanMedalion.replace("anillo", "")
            const cleanCarving = cleanRing.replace("carving", "")
            const cleanSilver = cleanCarving.replace("plata", "")
            const cleanPiedra = cleanSilver.replace("piedra", "")
            const cleanOso = cleanPiedra.replace("oso", "")
            const cleanElefante = cleanOso.replace("elefante", "")
            const cleanHuevo = cleanElefante.replace("huevo", "")
            const cleanFosil = cleanHuevo.replace("coralfosil", "")
            const cleanOm = cleanFosil.replace("om", "")
            const cleanPuño = cleanOm.replace("puño", "")
            const cleanCorazon = cleanPuño.replace("corazon", "")
            let finalFormatedGem = cleanCorazon.split(" ")
            if (!finalFormatedGem[0]) return 
            if (finalFormatedGem[0] === "jade" && finalFormatedGem[1] !== "de") {
                finalFormatedGem = [`${finalFormatedGem[0]} ${finalFormatedGem[1]}`]
            }
            Object.keys(translations["name"]["es"]).find(key => {
                if (translations["name"]["es"][key] === capitalizeFirstLetter(finalFormatedGem[0])) {
                    finalFormatedGem[0] = translations["name"]["en"][key]
                }
            })
            if (!gems[finalFormatedGem[0].toLowerCase()]) return tmp = {...tmp, [formatedGem[0]]: finalFormatedGem[0].toLowerCase()} 
            currentGems = {...currentGems, [formatedGem[0]]: gems[finalFormatedGem[0].toLowerCase()]}
        })
        setMissingDescription(tmp)
        returnObject = {...currentGems, ...tmp}
        console.log(currentGems)
        console.log(`missing description:`, tmp)

    }

    return (
        <Main
            meta={
                <Meta title="Update Descriptions" description="Click the button to update descriptions" />
            }
            current="updateDescriptions"
        >
            <div className="mb-24">
                <button type="button" onClick={handleUpdate} className="mt-8 text-center mx-auto block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Actualitzar</button>
            </div>
            {missingDescription ?
                <div>
                    <div>Gemmes que falta descripció: </div>
                    <div>{Object.keys(missingDescription).length}</div>
                    <br></br>
                    {Object.keys(missingDescription).map((key: any) => {
                        return (
                            <div>
                                <span>{key}: </span><span>{missingDescription[key]}</span>
                            </div>
                        )
                    })}
                </div>
            : null}
        </Main>
    )
}

export default UpdateDescriptions
