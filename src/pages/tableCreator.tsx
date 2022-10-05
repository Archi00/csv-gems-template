import { TranslationsLang, FormInfo, GemInfo } from "@/interfaces"
import { useEffect, useState } from "react"
import { GemForm } from "@/templates/GemForm"
import { Main } from "@/templates/Main"
import { Meta } from "@/layouts/Meta"
import { translations } from "@/utils/Translations"
import { reqOptions } from "@/utils/Appconfig"
import { Categories } from "@/utils/Categories"
import { Hardness } from "@/utils/Hardness"

const TableCreator = () => {
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
            const url = `https://www.gemmesterra.com/Botiga/upload/${gemInfo["id"].value}-${i}.jpeg`
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
        replaceInput()
        const item = {
            ID: gemInfo["id"].value,
            Active: 1,
            Categories: `2,${Object.values(catMap).join(",")}`,
            Price: gemInfo["price"].value,
            Reference: gemInfo["id"].value,
            Quantity: 1,
        }
        replaceSpan()
        setLoading(true)
        handleCopyBtn()
        await handleWriteJson(JSON.stringify(item))
    }

    const handleWriteJson = async (body: any) => {
        const data = await JSON.parse(body)
        const rawData = {} as any
        const enEndpoint = reqOptions.uri["en"]
        const esEndpoint = reqOptions.uri["es"]
        const catEndpoint = reqOptions.uri["cat"]
        const price: any = formInfo["weight"].nextSibling!
        const urls: any = createImgUrl()

        console.log("Fetching en version...")
        rawData["en"] = data
        rawData["en"]["Name"] = !joieria ? `${enName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("en")
        rawData["en"]["Description"] = enDesc
        const enData = JSON.stringify(rawData["en"])
        const enPost = reqOptions["post"]
        enPost["body"] = enData
        await fetch(enEndpoint, enPost)

        console.log("Fetching es version...")
        rawData["es"] = data
        rawData["es"]["Name"] = !joieria ? `${esName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("es")
        rawData["es"]["Description"] = esDesc
        const esData = JSON.stringify(rawData["es"])
        const esPost = reqOptions["post"]
        esPost["body"] = esData
        await fetch(esEndpoint, esPost)

        console.log("Fetching cat version...")
        rawData["cat"] = data
        rawData["cat"]["Name"] = !joieria ? `${catName} ${
            price.children[0].innerText || price.children[0].value
        }` : setName("cat")
        rawData["cat"]["Description"] = catDesc
        rawData["cat"]["imgUrls"] = urls
        const catData = JSON.stringify(rawData["cat"])
        const catPost = reqOptions["post"]
        catPost["body"] = catData
        await fetch(catEndpoint, catPost)

        setLoading(false)
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
        formInfo["size"].innerText = "SIZE : (LxWxH)"
        formInfo["weight"].innerText = joieria ? "GEM WEIGHT" : "TOTAL WEIGHT"
        formInfo["shape"].innerText = joieria ? "GEM SHAPE" : "SHAPE"
        formInfo["hardness"].innerText = joieria ? "GEM HARDNESS" : "HARDNESS"
        formInfo["origin"].innerText = joieria ? "GEM ORIGIN" : "ORIGIN"
        formInfo["treatment"].innerText = joieria ? "GEM TREATMENT" : "TREATMENT"
        formInfo["unh"].innerText = ": Unheated / Untreated"
        translate("en")
        setEnName(translations.name["en"][gemName]!)
        replaceInput()
        setEnDesc(formInfo["form"].innerHTML)
        replaceSpan()
    }

    const esVersion = () => {
        setLang("es")
        formInfo["product"].innerText = "Detalles del producto"
        formInfo["type"].innerText = "GEMA"
        formInfo["weight"].innerText = joieria ? "PESO GEMA" : "PESO TOTAL"
        formInfo["size"].innerText = "MEDIDAS: (LxWxH)"
        formInfo["shape"].innerText = joieria ? "FORMA GEMA" : "FORMA"
        formInfo["hardness"].innerText = joieria ? "DUREZA GEMA" : "DUREZA"
        formInfo["origin"].innerText = joieria ? "ORIGEN GEMA" : "ORIGEN"
        formInfo["treatment"].innerText = joieria ? "TRATAMIENTO GEMA" : "TRATAMIENTO"
        formInfo["unh"].innerText = ":  Sin tratamiento"
        translate("es")
        setEsName(translations.name["es"][gemName]!)
        replaceInput()
        setEsDesc(formInfo["form"].innerHTML)
        replaceSpan()
    }

    const catVersion = () => {
        setLang("cat")
        formInfo["product"].innerText = "Detalls del producte"
        formInfo["type"].innerText = "GEMMA"
        formInfo["weight"].innerText = joieria? "PES GEMMA" : "PES TOTAL"
        formInfo["size"].innerText = "MIDES: (LxWxH)"
        formInfo["shape"].innerText = joieria ? "FORMA GEMMA" : "FORMA"
        formInfo["hardness"].innerText = joieria ? "DURESA GEMMA" : "DURESA"
        formInfo["origin"].innerText = joieria ? "ORIGEN GEMMA" : "ORIGEN"
        formInfo["treatment"].innerText = joieria ? "TRACTAMENT GEMMA" : "TRACTAMENT"
        formInfo["unh"].innerText = ":  Sense tractament"
        translate("cat")
        setCatName(translations.name["cat"][gemName]!)
        replaceInput()
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
        </Main>
    )
}

export default TableCreator
