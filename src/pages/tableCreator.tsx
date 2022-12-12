import { TranslationsLang, FormInfo, GemInfo } from "@/interfaces"
import { useEffect, useState } from "react"
import { GemForm } from "@/templates/GemForm"
import { Main } from "@/templates/Main"
import { Meta } from "@/layouts/Meta"
import { translations } from "@/utils/Translations"
import { reqOptions } from "@/utils/Appconfig"
import { Categories } from "@/utils/Categories"
import { Hardness } from "@/utils/Hardness"
import { capitalizeFirstLetter } from "@/utils/helpers"

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

const TableCreator = ({gems}: any) => {
    const [formInfo, setFormInfo] = useState({} as FormInfo)
    const [gemInfo, setGemInfo] = useState({} as GemInfo)
    const [gemName, setGemName] = useState("")
    const [gemCut, setGemCut] = useState("")
    const [gemColor, setGemColor] = useState("")
    const [lang, setLang] = useState("")
    const [loading, setLoading] = useState(false)
    const [catMap, setCatMap] = useState({} as any)
    const [flCat, setFLCat] = useState([] as any[])
    const [slCat, setSLCat] = useState([] as any[])
    const [tlCat, setTLCat] = useState([] as any[])
    const [enDesc, setEnDesc] = useState("")
    const [esDesc, setEsDesc] = useState("")
    const [catDesc, setCatDesc] = useState("")
    const [enName, setEnName] = useState("")
    const [esName, setEsName] = useState("")
    const [catName, setCatName] = useState("")
    const [joieria, setJoieria] = useState<boolean>(false)
    const [joieraNamePrefix,setJoieraNamePrefix] = useState<string>("")
    const [ready, setReady] = useState<boolean>(false)
    const [gemOrigin, setGemOrigin] = useState<string>("")
    const [gemSize, setGemSize] = useState<string>("")
    const [forceRender, setForceRender] = useState<boolean>(false)
    const [enTbl, setEnTbl] = useState<any[]>([])
    const [esTbl, setEsTbl] = useState<any[]>([])
    const [catTbl, setCatTbl] = useState<any[]>([])
    
    useEffect(() => {
        const name = document.getElementById("name")
        name!.onchange = (e: any) => {
            setGemName(e.target.value.toLowerCase())
        }
    }, [])

    useEffect(() => {
        setFormInfo({
            form: document.getElementById("form"),
            info: document.getElementsByTagName("input"),
            values: document.getElementsByTagName("span"),
            btn: document.getElementById("btn"),
            copy: document.getElementById("copy"),
            product: document.getElementById("product"),
            type: document.getElementById("type"),
            weight: document.getElementById("weight"),
            size: document.getElementById("size"),
            shape: document.getElementById("shape"),
            color: document.getElementById("color"),
            hardness: document.getElementById("hardness"),
            origin: document.getElementById("origin"),
            treatment: document.getElementById("treatment"),
            unh: document.getElementById("unh"),
            en: document.getElementById("en"),
            es: document.getElementById("es"),
            cat: document.getElementById("cat"),
        } as FormInfo)
        setGemInfo({
            id: document.getElementById("ref"),
            price: document.getElementById("price"),
            quantity: document.getElementById("quantity"),
            name: document.getElementById("name"),
        } as GemInfo)
        setFLCat(Object.keys(Categories))
    }, [lang])

    useEffect(() => {
        if (loading) {
            console.log("Loading...")
        }
        if (gemName && gemCut && gemColor || ready) {
            enVersion()
            esVersion()
            catVersion()
        }
        if (enDesc && esDesc && catDesc) {
            createWriteData()
        }
    }, [lang, gemColor, gemCut, gemName, enDesc, esDesc, catDesc, ready, formInfo])

    const replaceSpan = () => {
        for (let i = 0, l = formInfo["values"].length; i < l; i += 1) {
            const input = document.createElement("input")
            input.value = `${formInfo["values"][0]!.innerText}`
            formInfo["values"][0]!.parentNode!.replaceChild(input, formInfo["values"][0]!)
        }
    }

    const replaceInput = () => {
        for (let i = 0, l = formInfo["info"].length; i < l; i += 1) {
            const span = document.createElement("span")
            span.innerText = `${formInfo["info"][0]!.value}`
            formInfo["info"][0]!.parentNode!.replaceChild(span, formInfo["info"][0]!)
        }
    }

    const handleCreateTablesBtn = (e: any) => {
        e.preventDefault()
        replaceInput()

        formInfo["en"].style.display = "inline"
        formInfo["es"].style.display = "inline"
        formInfo["cat"].style.display = "inline"
        replaceSpan()

        setGemName(formInfo["info"][0]!.value)
        setGemCut(formInfo["info"][3]!.value)
        setGemColor(formInfo["info"][4]!.value)
        formInfo["btn"].style.display = "none"
    }

    const createImgUrl = () => {
        let tmp = []
        for (let i = 0, l = 3; i <= l; i++) {
            const url = `https://www.gemmesterra.com/Botiga/upload/${gemInfo["id"]? gemInfo["id"].value: ""}-${i}.jpeg`
            tmp.push(url)
        }
        return tmp
    }

    const setName = (lang:keyof TranslationsLang) => { 
        if (lang === "en") return `${translations.name[lang][gemName] || translations.name[lang]["joieria"][gemName] || ""} ${
            translations.name[lang]["joieria"][joieraNamePrefix.toLowerCase()] }`
        return `${translations.name[lang]["joieria"][joieraNamePrefix.toLowerCase()]} ${
            translations.name[lang][gemName] || translations.name[lang]["joieria"][gemName] || ""}`
    }

    const createWriteData = async () => {
        if (gemInfo["id"] && gemInfo["price"]) {
            replaceInput()
            const item = {
                ID: gemInfo["id"].value,
                Active: 1,
                Categories: `2,${Object.values(catMap).join(",")}`,
                Price: gemInfo["price"].value,
                Reference: gemInfo["id"].value,
                Quantity: 1,
            }
            console.log(`Before replaceSpan(): ${JSON.stringify(item)}`)
            replaceSpan()
            console.log(`After replaceSpan(): ${JSON.stringify(item)}`)
            setLoading(true)
            handleCopyBtn()
            return await handleWriteJson(JSON.stringify(item))
        }
        return
    }

    const handleWriteJson = async (body: any) => {
        const data = await JSON.parse(body)
        const rawData = {} as any
        const enEndpoint = reqOptions.uri["en"]
        const esEndpoint = reqOptions.uri["es"]
        const catEndpoint = reqOptions.uri["cat"]
        const price: any = formInfo["weight"].nextSibling!
        const urls: any = createImgUrl()
        console.log("---------------NEW DATA---------------")
        console.log("--------------EN DATA---------------")
        console.log(enTbl)
        console.log("----------END OF EN DATA------------")
        console.log("--------------ES DATA---------------")
        console.log(esTbl)
        console.log("----------END OF ES DATA------------")
        console.log("--------------CAT DATA---------------")
        console.log(catTbl)
        console.log("----------END OF CAT DATA------------")
        console.log("-----------END OF NEW DATA------------")
        
        console.log("Fetching en version...")
        rawData["en"] = data
        rawData["en"]["Name"] = !joieria ? `${enName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("en")
        rawData["en"]["Description"] = enDesc
        rawData["en"]["TestDescription"] = enTbl
        rawData["en"]["ShortDescription"] = "<p></p>"
        Object.keys(gems).map((gem: any) =>{
            if (gem === enName.toLowerCase()) return rawData["en"]["ShortDescription"] = gems[gem]["en"]            
        })
        rawData["en"]["meta-title"] = `${capitalizeFirstLetter(rawData["en"]["Name"])} - Gemmesterra`
        rawData["en"]["meta-description"] = `${translations.color["en"][gemColor]} ${translations.cut["en"][gemCut].toLowerCase()} ${capitalizeFirstLetter(rawData["en"]["Name"])} (${gemSize}) from ${gemOrigin} - Not treated`
        const enData = JSON.stringify(rawData["en"])
        const enPost = reqOptions["post"]
        enPost["body"] = enData
        await fetch(enEndpoint, enPost)

        console.log("Fetching es version...")
        rawData["es"] = data
        rawData["es"]["Name"] = !joieria ? `${esName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("es")
        rawData["es"]["TestDescription"] = esTbl
        rawData["es"]["Description"] = esDesc
        rawData["es"]["ShortDescription"] = "<p></p>"
        Object.keys(gems).map((gem: any) =>{
            if (gem === enName.toLowerCase()) return rawData["es"]["ShortDescription"] = gems[gem]["es"]

        })
        rawData["es"]["meta-title"] = `${capitalizeFirstLetter(rawData["es"]["Name"])} - Gemmesterra`
        rawData["es"]["meta-description"] = ` ${capitalizeFirstLetter(rawData["es"]["Name"])} de color ${translations.color["es"][gemColor].toLowerCase()} con forma ${translations.cut["es"][gemCut].toLowerCase()} (${gemSize}) de ${gemOrigin} - Sin tratamientos`
        const esData = JSON.stringify(rawData["es"])
        const esPost = reqOptions["post"]
        esPost["body"] = esData
        await fetch(esEndpoint, esPost)

        console.log("Fetching cat version...")
        rawData["cat"] = data
        rawData["cat"]["Name"] = !joieria ? `${catName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("cat")
        rawData["cat"]["TestDescription"] = catTbl
        rawData["cat"]["Description"] = catDesc
        rawData["cat"]["ShortDescription"] = "<p></p>"
        Object.keys(gems).map((gem: any) =>{
            if (gem === enName.toLowerCase()) return rawData["cat"]["ShortDescription"] = gems[gem]["cat"]
        })
        rawData["cat"]["meta-title"] = `${capitalizeFirstLetter(rawData["cat"]["Name"])} - Gemmesterra`
        rawData["cat"]["meta-description"] = ` ${capitalizeFirstLetter(rawData["cat"]["Name"])} de color ${translations.color["cat"][gemColor].toLowerCase()} amb forma ${translations.cut["cat"][gemCut].toLowerCase()} (${gemSize}) de ${gemOrigin} - Sense tractaments`
        rawData["cat"]["imgUrls"] = urls
        const catData = JSON.stringify(rawData["cat"])
        const catPost = reqOptions["post"]
        catPost["body"] = catData
        await fetch(catEndpoint, catPost)
        setLoading(false)
        setForceRender(true)
        setTimeout(() => setForceRender(false), 500)
        window.location.reload()
    }

    const translate = (lang: keyof TranslationsLang) => {
        if (joieria) {
            formInfo["info"][0]!.value = setName(lang)
        }
        if (translations.name.en[gemName]) {
            formInfo["info"][0]!.value = translations.name[lang][gemName]!
        }
        if (translations.cut.en[gemCut]) {
            formInfo["info"][3]!.value = translations.cut[lang][gemCut]!
        }
        if (translations.color.en[gemColor]) {
            formInfo["info"][4]!.value = translations.color[lang][gemColor]!
        }
    }

    const enVersion = async () => {
        setLang("en")
        formInfo["product"].innerText = "Product Details"
        formInfo["type"].innerText = "GEM TYPE"
        formInfo["size"].innerText = "SIZE (LxWxH)"
        formInfo["weight"].innerText = joieria ? "GEM WEIGHT" : "TOTAL WEIGHT"
        formInfo["shape"].innerText = joieria ? "GEM SHAPE" : "SHAPE"
        formInfo["hardness"].innerText = joieria ? "GEM HARDNESS" : "HARDNESS"
        formInfo["origin"].innerText = joieria ? "GEM ORIGIN" : "ORIGIN"
        formInfo["treatment"].innerText = joieria ? "GEM TREATMENT" : "TREATMENT"
        formInfo["unh"].innerText = ": Unheated / Untreated"
        setGemOrigin(formInfo["info"][6]!.value)
        setGemSize(formInfo["info"][2]!.value)
        translate("en")
        if (gemName !== "amber") {
            setEnName(translations.name["en"][gemName])
        }
        if (gemName === "amber") {
            setEnName(`${translations.name["en"][gemName]} (${formInfo["info"][6]!.value})`)
        }
        replaceInput()
        console.log("--------------------EN VERSION----------------------")
        const tbl = formInfo["form"].innerText.split("\n")
        for (let i = 1, l = tbl.length; i < l; i++) {
            const keyVal = tbl[i]?.split(":")!
            const key = keyVal[0]?.toLowerCase().replace("\t", "")
            const val = keyVal[1]?.trim()
            setEnTbl(enTbl => [...enTbl, {[key as string]: val}])
        }
        console.log("----------------END OF EN VERSION------------------")
        setEnDesc(formInfo["form"].innerHTML)
        replaceSpan()
    }

    const esVersion = () => {
        setLang("es")
        formInfo["product"].innerText = "Detalles del producto"
        formInfo["type"].innerText = "GEMA"
        formInfo["weight"].innerText = joieria ? "PESO GEMA" : "PESO TOTAL"
        formInfo["size"].innerText = "MEDIDAS (LxWxH)"
        formInfo["shape"].innerText = joieria ? "FORMA GEMA" : "FORMA"
        formInfo["hardness"].innerText = joieria ? "DUREZA GEMA" : "DUREZA"
        formInfo["origin"].innerText = joieria ? "ORIGEN GEMA" : "ORIGEN"
        formInfo["treatment"].innerText = joieria ? "TRATAMIENTO GEMA" : "TRATAMIENTO"
        formInfo["unh"].innerText = ":  Sin tratamiento"
        translate("es")
        if (gemName !== "amber") {
            setEsName(translations.name["es"][gemName])
        }
        if (gemName === "amber") {
            setEsName(`${translations.name["es"][gemName]} (${gemOrigin})`)
        }
        replaceInput()
        console.log("--------------------ES VERSION----------------------")
        console.log(formInfo["form"].innerText)
        const tbl = formInfo["form"].innerText.split("\n")
        for (let i = 1, l = tbl.length; i < l; i++) {
            const keyVal = tbl[i]?.split(":")!
            const key = keyVal[0]?.toLowerCase().replace("\t", "")
            const val = keyVal[1]?.trim()
            setEsTbl(esTbl => [...esTbl, {[key as string]: val}])
        }
        console.log("----------------END OF ES VERSION------------------")
        setEsDesc(formInfo["form"].innerHTML)
        replaceSpan()
    }

    const catVersion = () => {
        setLang("cat")
        formInfo["product"].innerText = "Detalls del producte"
        formInfo["type"].innerText = "GEMMA"
        formInfo["weight"].innerText = joieria? "PES GEMMA" : "PES TOTAL"
        formInfo["size"].innerText = "MIDES (LxWxH)"
        formInfo["shape"].innerText = joieria ? "FORMA GEMMA" : "FORMA"
        formInfo["hardness"].innerText = joieria ? "DURESA GEMMA" : "DURESA"
        formInfo["origin"].innerText = joieria ? "ORIGEN GEMMA" : "ORIGEN"
        formInfo["treatment"].innerText = joieria ? "TRACTAMENT GEMMA" : "TRACTAMENT"
        formInfo["unh"].innerText = ":  Sense tractament"
        translate("cat")
        if (gemName !== "amber") {
            setCatName(translations.name["cat"][gemName])
        }
        if (gemName === "amber") {
            setCatName(`${translations.name["cat"][gemName]} (${gemOrigin})`)
        }
        replaceInput()
        console.log("-------------------CAT VERSION----------------------")
        console.log(formInfo["form"].innerText)
        const tbl = formInfo["form"].innerText.split("\n")
        for (let i = 1, l = tbl.length; i < l; i++) {
            const keyVal = tbl[i]?.split(":")!
            const key = keyVal[0]?.toLowerCase().replace("\t", "").trim()
            const val = keyVal[1]?.trim()
            setCatTbl(catTbl => [...catTbl, {[key as string]: val}])
        }
        console.log("----------------END OF CAT VERSION------------------")
        setCatDesc(formInfo["form"].innerHTML)
        replaceSpan()
    }

    const handleCatSelection = (e: any, level: number) => {
        const fOption: HTMLElement = document.querySelector("#fOption")!
        const sOption: HTMLElement = document.querySelector("#sOption")!
        const tOption: HTMLElement = document.querySelector("#tOption")!
        let key: any, value: any, subKey: any, subValues: any

        switch (level) {
            case 0:
                fOption.style.display = "none"
                key = Categories[e.target.value]
                value = Object.keys(key)[0]
                setSLCat(Object.keys(key[value]))
                setCatMap({ [e.target.value]: value })
                if (e.target.value === "JOIERIA") setJoieria(true)
                break
            case 1:
                sOption.style.display = "none"
                key = Categories[Object.keys(catMap)[0]!]
                value = Object.values(key)[0]
                subKey = Object.keys(value[e.target.value])[0]
                subValues = value[e.target.value][subKey!]
                if(joieria) setJoieraNamePrefix(e.target.value)
                if (Object.keys(catMap).length > 1) {
                    delete catMap[Object.keys(catMap)[1]!]
                }
                if (subValues) {
                    setTLCat(Object.keys(subValues))
                }
                setCatMap((catMap: any) =>
                    Object.assign(catMap, {
                        [e.target.value]:
                            Object.keys(value[e.target.value])[0] || value[e.target.value],
                    })
                )
                break
            case 2:
                tOption.style.display = "none"
                key = Categories[Object.keys(catMap)[0]!]
                value = Object.values(key)[0]
                subKey = Object.keys(value[Object.keys(catMap)[1]!])
                subValues = value[Object.keys(catMap)[1]!][subKey!]
                if (Object.keys(catMap).length > 2) {
                    delete catMap[Object.keys(catMap)[2]!]
                }

                setCatMap((catMap: any) =>
                    Object.assign(catMap, {
                        [e.target.value]: subValues[e.target.value],
                    })
                )
                break
        }
    }

    const handleCopyBtn = () => {
        replaceInput()
        replaceSpan()
    }

    const handleEn = (e: any) => {
        e.preventDefault()
        enVersion()
    }

    const handleEs = (e: any) => {
        e.preventDefault()
        esVersion()
    }

    const handleCat = (e: any) => {
        e.preventDefault()
        catVersion()
    }

    const handleAppendToJson = async () => {
        setGemName(formInfo["info"][0]!.value.toLowerCase())
        if (joieria) setReady(true)
        if (Hardness[gemName]) {
            setGemCut(formInfo["info"][3]!.value.toLowerCase())
            setGemColor(formInfo["info"][4]!.value.toLowerCase())
        }
    }

    return (
        <Main
            meta={
                <Meta
                    title="Table"
                    description="Populate table, translate it and copy to clipboard"
                ></Meta>
            }
            current="table"
        >
            {!forceRender ?
            <GemForm
                handleCreateTablesBtn={handleCreateTablesBtn}
                handleEn={handleEn}
                handleEs={handleEs}
                handleCat={handleCat}
                handleAppendToJson={handleAppendToJson}
                handleCatSelection={handleCatSelection}
                gemName={gemName}
                loading={loading}
                flCat={flCat}
                slCat={slCat}
                tlCat={tlCat}
            />
            : 
            <div role="status" className="flex align-center justify-center mt-[20%]">
                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>

            }
        </Main>
    )
}

export default TableCreator
