import { NextPageContext } from "next"
import { useEffect, useRef, useState } from "react"
import Form from "../templates/Form"
import executeQuery from "../utils/db"
import styles from "../styles/AddAsset.module.css"

export interface IFormData {
    nom: string
    mida?: string
    origen: string
    pesKg?: string
    pesGr?: string
    pesCt?: string
    numPeces?: string
    numCapça?: string
    talla?: string
    color?: string
    preuCostPes?: string
    preuCost?: string
    preuEstimatPes?: string
    preuEstimat?: string
    pvpPes?: string
    pvp?: string
    quantitat?: string
    qualitat?: string
    venta?: string
    comentaris?: string
}

export interface IAdd {
    tables?: string | undefined
}

export interface IImageData {
    id: string
    data: string
}

export interface Table {
    [key: string]: string | string | null
}

export async function getServerSideProps(_ctx: NextPageContext) {
    try {
        const query = await executeQuery({
            query: "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'gemmeste_inv';",
            values: [],
        })
        const tables = JSON.stringify(query)
        return { props: { tables } }
    } catch (e: unknown) {
        console.error(e)
        return { e }
    }
}

const AddAsset = ({ tables }:any) => {
    const image = useRef<HTMLInputElement>(null)
    const imagePreview = useRef<HTMLDivElement>(null)
    const [currentId, setCurrentId] = useState<string>(Date.now().toString())
    const [imageData, setImageData] = useState<string[]>([])
    const [table, setTable] = useState<string>("")
    const [parsedTables, setParsedTables] = useState<Table[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingMessage, setLoadingMessage] = useState<string>("")
    const [correctlySavedAsset, setCorrectlySavedAsset] = useState<boolean | null>(null)
    const [formData, setFormData] = useState<IFormData>({
        nom: "",
        mida: "",
        origen: "",
        pesKg: "",
        pesGr: "",
        pesCt: "",
        numPeces: "",
        numCapça: "",
        talla: "",
        color: "",
        preuCostPes: "",
        preuCost: "",
        preuEstimatPes: "",
        preuEstimat: "",
        pvpPes: "",
        pvp: "",
        quantitat: "",
        qualitat: "",
        venta: "",
        comentaris: "",
    })

    useEffect(() => {
        const parseTables = async () => {
            const parsedTables = await JSON.parse(tables!)
            setParsedTables(parsedTables)
        }
        parseTables()
    }, [])

    const handleButton = async () => {
        setLoading(true)
        setLoadingMessage("Setting Asset ID...")
        setCurrentId(Date.now().toString())
        setLoadingMessage("Parsing image Data...")
        const sendImageData = JSON.stringify(imageData)
        setLoadingMessage("Saving image to server...")
        const imageResult = await fetch("/api/saveFirebaseImage", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                id: currentId.toString(),
            },
            body: sendImageData,
        })
        const parsedImageResults = await imageResult.json()
        setLoadingMessage("Parsing server response...")
        const jsonImageResults: string = await parsedImageResults.join(",")
        if (jsonImageResults.length < 1) {
            return setLoadingMessage("Failed to Save Image!")
        }
        setLoadingMessage("Image saved correctly!")
        setLoadingMessage("Saving info to DB...")
        const dbResult = await fetch("/api/writeAsset", {
            method: "POST",
            headers: {
                id: currentId.toString(),
                table,
                imageurls: jsonImageResults,
            },
            body: JSON.stringify(formData),
        })
        setLoadingMessage("Parsing server response...")
        const parsedDbResult = await dbResult.json()
        if (parsedDbResult.result["insertId"] !== 1) {
            setLoadingMessage("Error Saving Asset!")
            setCorrectlySavedAsset(false)
        }
        setLoadingMessage("Asset Saved Correctly!")
        setCorrectlySavedAsset(true)
        setLoading(false)
    }

    function resizeMe(img: HTMLImageElement) {
        const canvas = document.createElement("canvas")
        const maxWidth = 250
        const maxHeight = 250
        let width = img.width
        let height = img.height

        if (width > height) {
            if (width > maxWidth) {
                height = Math.round((height *= maxWidth / width))
                width = maxWidth
            }
        } else {
            if (height > maxHeight) {
                width = Math.round((width *= maxHeight / height))
                height = maxHeight
            }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx!.drawImage(img, 0, 0, width, height)

        imagePreview.current!.appendChild(canvas)

        return canvas.toDataURL("image/jpeg", 0.4)
    }

    const putImage = () => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(image.current!.files![0] as File)
        reader.onload = (event) => {
            const blob = new Blob([event.target?.result!])
            window.URL = window.URL || window.webkitURL
            const blobURL = window.URL.createObjectURL(blob)

            const helperImage = new Image()
            helperImage.src = blobURL
            helperImage.onload = () => {
                const resized = resizeMe(helperImage)
                const writeData = resized.replace(/^data:image\/\w+;base64,/, "")
                setImageData((imageData) => [...imageData, writeData])
            }
        }
    }

    return (
        <section>
            <Form
                setFormData={setFormData}
                setTable={setTable}
                tables={parsedTables}
                formData={formData}
            />
            <input
                className={styles.fileReader}
                type="file"
                ref={image}
                id="select_image"
                name="image"
                onChange={putImage}
            />
            {loading ? (
                <div>{loadingMessage}</div>
            ) : correctlySavedAsset === null ? (
                <button onClick={handleButton}>Guardar Info</button>
            ) : null}
            {correctlySavedAsset === true ? (
                <div
                    onClick={() => {
                        window.location.reload()
                    }}
                    className={styles.successMessage}
                >
                    S&apos;ha guardat correctament!
                </div>
            ) : correctlySavedAsset === false ? (
                <div
                    onClick={() => {
                        window.location.reload()
                    }}
                    className={styles.errorMessage}
                >
                    Hi ha hagut un error al guardar!
                </div>
            ) : null}
            <div ref={imagePreview}></div>
        </section>
    )
}

export default AddAsset

