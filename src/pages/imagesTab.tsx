import React, { useState, useRef } from "react"

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop"
import { canvasPreview } from "../utils/canvasPreview"
import { useDebounceEffect } from "../utils/useDebounceEffect"

import "react-image-crop/dist/ReactCrop.css"
import { Main } from "@/templates/Main"
import { Meta } from "@/layouts/Meta"
import { reqOptions } from "@/utils/Appconfig"
import RefDropDown from "@/templates/RefDropDown"

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 70,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    )
}

export default function ImagesTab() {
    const [imgSrc, setImgSrc] = useState("")
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(1 / 1)
    const [currentId, setCurrentId] = useState<string>("")
    const [currentIndex, setCurrentIndex] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [dataLength, setDataLength] = useState<number>(0)
    const [isSaved, setIsSaved] = useState<boolean>(false)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined)
            const reader = new FileReader()
            reader.addEventListener("load", () => setImgSrc(reader.result!.toString() || ""))
            reader.readAsDataURL(e.target.files[0]!)
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                )
                const src = previewCanvasRef.current
                const srcData = src
                .toDataURL("image/jpeg", 0.40)
                const data = srcData.replace(/^data:image\/\w+;base64,/, "")
                const sizeInBytes = 4 * Math.ceil(data.length / 3) * 0.5624896334383812
                const sizeInKb = Math.ceil(sizeInBytes / 1000) + 250
                setDataLength(sizeInKb)
            }
        },
        100,
        [completedCrop, scale, rotate]
    )

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined)
        } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(1 / 1)
            setCrop(centerAspectCrop(width, height, 1 / 1))
        }
    }

    async function handleSaveImage() {
        setLoading(true)
        if (!currentId) return setLoading(false)
        const cnv: HTMLCanvasElement | null = document.querySelector("#dwnCanvas")!
        const imgSrc: string = cnv.toDataURL("image/jpeg", 0.40)
        const endpoint = reqOptions["uri"]["image"]
        const post = reqOptions["postImg"]
        const data = imgSrc.replace(/^data:image\/\w+;base64,/, "")
        post["body"] = data
        post["headers"]["name"] = currentId
        post["headers"]["index"] = currentIndex
        const response = await fetch(endpoint, post)
        if(response.status === 200) setIsSaved(true)

        setLoading(false)
        return setTimeout(() => setIsSaved(false),5000)
    }

    function handleImgIdChange(e: string) {
        const empty: HTMLElement | null = document.querySelector("#fEmpty")!
        empty.style.display = "none"
        setCurrentId(e)
    }

    function handleImgPosChange(e: string) {
        const empty: HTMLElement | null = document.querySelector("#pEmpty")!
        empty.style.display = "none"
        setCurrentIndex(e)
    }

    return (
        <Main
            meta={<Meta title="Images" description="Upload, Crop, Resize Images"></Meta>}
            current="images"
        >
            <div className="flex flex-wrap gap-6 mt-4 sm:gap-14">
                {Boolean(imgSrc) && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        className="max-h-[50vh]"
                        style={{ maxWidth: "45%" }}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
                <div>
                    {Boolean(completedCrop) && (
                        <>
                            <div className="sm:w-[50%]">
                                <canvas
                                    ref={previewCanvasRef}
                                    id="dwnCanvas"
                                    style={{
                                        border: "1px solid black",
                                        objectFit: "contain",
                                        width: completedCrop!.width,
                                        height: completedCrop!.height,
                                    }}
                                />
                            </div>
                            <div className="mt-8 text-center">
                                <RefDropDown
                                    handleImgPosChange={handleImgPosChange}
                                    handleImgIdChange={handleImgIdChange}
                                />
                            </div>
                            {dataLength > 0 ? (
                                <div>
                                    <p
                                        className={`${
                                            dataLength > 1000 ? "text-red-500" : null
                                        } mx-auto text-center mt-4`}
                                    >
                                        {dataLength} Kb
                                    </p>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
                <div className="Crop-Controls mt-4">
                    <input type="file" accept="image/*" onChange={onSelectFile} />
                    <div>
                        <label htmlFor="scale-input">Scale: </label>
                        <input
                            id="scale-input"
                            type="number"
                            step="0.1"
                            value={scale}
                            disabled={!imgSrc}
                            onChange={(e) => setScale(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="rotate-input">Rotate: </label>
                        <input
                            id="rotate-input"
                            type="number"
                            value={rotate}
                            disabled={!imgSrc}
                            onChange={(e) =>
                                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                            }
                        />
                    </div>
                    <div>
                        <button onClick={handleToggleAspectClick}>
                            Toggle aspect {aspect ? "off" : "on"}
                        </button>
                    </div>
                </div>
                {isSaved ? 
                <div className="mx-auto bg-green-300 py-2 px-4">
                    
                    <p className="text-center text-sm"><span>&#10003;</span> L&#39;imatge s&#39;ha guardat correctament!</p>
                </div>
                : null}
                {Boolean(imgSrc) ? (
                    loading ? (
                        <button
                            disabled
                            type="button"
                            className="m-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  dwn-button"
                        >
                            <svg
                                role="status"
                                className="inline mr-3 w-4 h-4 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Loading...
                        </button>
                    ) : (
                        <button
                            disabled={dataLength > 1000 ? true : false}
                            onClick={handleSaveImage}
                            className={`${
                                dataLength > 1000
                                    ? "bg-red-500 hover:bg-red-700"
                                    : "bg-blue-500 hover:bg-blue-700"
                            } m-auto mt-4 text-white font-bold py-2 px-4 rounded  dwn-button`}
                        >
                            Save Image
                        </button>
                    )
                ) : null}
            </div>
        </Main>
    )
}
