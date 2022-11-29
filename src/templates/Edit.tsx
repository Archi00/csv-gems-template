import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "./Edit.module.css"

export interface IEdit {
    asset?: { [key: string]: string }
    name?: string
    size?: string
    origin?: string
    pes_kg?: string
    pes_gr?: string
    pes_ct?: string
    num_peces?: string
    num_capça?: string
    talla?: string
    color?: string
    preu_cost_pes?: string
    preu_cost?: string
    preu_estimat_pes?: string
    preu_estimat?: string
    pvp_pes?: string
    pvp?: string
    quantitat?: string
    qualitat?: string
    venta?: string
    comments?: string
    setOnEdit: Dispatch<SetStateAction<{ state: boolean; asset: any }>>
}

const Edit: React.FC<IEdit> = ({ asset }) => {
    const [editData, setEditData] = useState(asset)
    const [writeData, setWriteData] = useState({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value }: {name: string, value: string | undefined} = event.target
        value = value || asset![name]
        setEditData({ ...editData, [name]: value!.toLowerCase() })
    }

    const handleUpdate = async () => {
        await fetch("/api/updateAsset", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(writeData),
        })
        window.location.reload()
        // setOnEdit({ state: false, asset: writeData })
    }

    useEffect(() => {
        setWriteData({ ...asset, ...editData })
    }, [editData])

    return (
        <>
            {asset ? (
                <div className={styles.wrapper}>
                    <form>
                        <div className={styles.container}>
                            <label htmlFor="Nom"></label>
                            <input
                                className={styles.input}
                                id="nom"
                                name="name"
                                type="text"
                                onChange={handleChange}
                                placeholder={
                                    asset["name"] && asset["name"] != "0"
                                        ? `Nom: ${asset["name"]}`
                                        : "Nom"
                                }
                            />
                            <label htmlFor="Mida"></label>
                            <input
                                className={styles.input}
                                id="mida"
                                type="text"
                                name="size"
                                onChange={handleChange}
                                placeholder={
                                    asset["size"] && asset["size"] != "0"
                                        ? `Mida: ${asset["size"]}`
                                        : "Mida"
                                }
                            />
                            <label htmlFor="Origen"></label>
                            <input
                                className={styles.input}
                                id="origen"
                                type="text"
                                name="origin"
                                onChange={handleChange}
                                placeholder={
                                    asset["origin"] && asset["origin"] != "0"
                                        ? `Origen: ${asset["origin"]}`
                                        : "Origen"
                                }
                            />
                            <label htmlFor="Pes KG"></label>
                            <input
                                className={styles.input}
                                id="pes_kg"
                                type="text"
                                name="pes_kg"
                                onChange={handleChange}
                                placeholder={
                                    asset["pes_kg"] && asset["pes_kg"] != "0"
                                        ? `Pes: ${asset["pes_kg"]} Kg`
                                        : "Pes KG"
                                }
                            />
                            <label htmlFor="Pes GR"></label>
                            <input
                                className={styles.input}
                                id="pes_gr"
                                type="text"
                                name="pes_gr"
                                onChange={handleChange}
                                placeholder={
                                    asset["pes_gr"] && asset["pes_gr"] != "0"
                                        ? `Pes: ${asset["pes_gr"]} gr`
                                        : "Pes GR"
                                }
                            />
                            <label htmlFor="PES CT"></label>
                            <input
                                className={styles.input}
                                id="pes_ct"
                                type="text"
                                name="pes_ct"
                                onChange={handleChange}
                                placeholder={
                                    asset["pes_ct"] && asset["pes_ct"] != "0"
                                        ? `Pes: ${asset["pes_ct"]} ct`
                                        : "Pes CT"
                                }
                            />
                            <label htmlFor="NUMERO PECES"></label>
                            <input
                                className={styles.input}
                                id="num_peces"
                                type="text"
                                name="num_peces"
                                onChange={handleChange}
                                placeholder={
                                    asset["num_peces"] && asset["num_peces"] != "0"
                                        ? `Num Peces: ${asset["num_peces"]}`
                                        : "Num peces"
                                }
                            />
                            <label htmlFor="NUMERO CAPÇA"></label>
                            <input
                                className={styles.input}
                                id="num_capça"
                                type="text"
                                name="num_capça"
                                onChange={handleChange}
                                placeholder={
                                    asset["num_capça"] && asset["num_capça"] != "0"
                                        ? `Num capça: ${asset["num_capça"]}`
                                        : "Num Capça"
                                }
                            />
                            <label htmlFor="TALLA"></label>
                            <input
                                className={styles.input}
                                id="talla"
                                type="text"
                                name="talla"
                                onChange={handleChange}
                                placeholder={
                                    asset["talla"] && asset["talla"] != "0"
                                        ? `Talla: ${asset["talla"]}`
                                        : "Talla"
                                }
                            />
                            <label htmlFor="COLOR"></label>
                            <input
                                className={styles.input}
                                id="color"
                                type="text"
                                name="color"
                                onChange={handleChange}
                                placeholder={
                                    asset["color"] && asset["color"] != "0"
                                        ? `Color: ${asset["color"]}`
                                        : "Color"
                                }
                            />
                            <label htmlFor="PREU COST PES"></label>
                            <input
                                className={styles.input}
                                id="preu_cost_pes"
                                type="text"
                                name="preu_cost_pes"
                                onChange={handleChange}
                                placeholder={
                                    asset["preu_cost_pes"] && asset["preu_cost_pes"] != "0"
                                        ? `Preu Cost pes: ${asset["preu_cost_pes"]}`
                                        : "Preu Cost Pes"
                                }
                            />
                            <label htmlFor="PREU COST"></label>
                            <input
                                className={styles.input}
                                id="preu_cost"
                                type="text"
                                name="preu_cost"
                                onChange={handleChange}
                                placeholder={
                                    asset["preu_cost"] && asset["preu_cost"] != "0"
                                        ? `Preu Cost: ${asset["preu_cost"]}`
                                        : "Preu Cost"
                                }
                            />
                            <label htmlFor="PREU ESTIMAT PES"></label>
                            <input
                                className={styles.input}
                                id="preu_estimat_pes"
                                type="text"
                                name="preu_estimat_pes"
                                onChange={handleChange}
                                placeholder={
                                    asset["preu_estimat_pes"] && asset["preu_estimat_pes"] != "0"
                                        ? `Preu Estimat Pes: ${asset["preu_estimat_pes"]}`
                                        : "Preu Estimat Pes"
                                }
                            />
                            <label htmlFor="PREU ESTIMAT"></label>
                            <input
                                className={styles.input}
                                id="preu_estimat"
                                type="text"
                                name="preu_estimat"
                                onChange={handleChange}
                                placeholder={
                                    asset["preu_estimat"] && asset["preu_estimat"] != "0"
                                        ? `Preu Estimat: ${asset["preu_estimat"]}`
                                        : "Preu Estimat"
                                }
                            />
                            <label htmlFor="PVP PES"></label>
                            <input
                                className={styles.input}
                                id="pvp_pes"
                                type="text"
                                name="pvp_pes"
                                onChange={handleChange}
                                placeholder={
                                    asset["pvp_pes"] && asset["pvp_pes"] != "0"
                                        ? `Pvp a pes: ${asset["pvp_pes"]}`
                                        : "Pvp a pes"
                                }
                            />
                            <label htmlFor="PVP"></label>
                            <input
                                className={styles.input}
                                id="pvp"
                                type="text"
                                name="pvp"
                                onChange={handleChange}
                                placeholder={
                                    asset["pvp"] && asset["pvp"] != "0"
                                        ? `Pvp: ${asset["pvp"]}`
                                        : "Pvp"
                                }
                            />
                            <label htmlFor="QUANTITAT"></label>
                            <input
                                className={styles.input}
                                id="quantitat"
                                type="text"
                                name="quantitat"
                                onChange={handleChange}
                                placeholder={
                                    asset["quantitat"] && asset["quantitat"] != "0"
                                        ? `Quantitat: ${asset["quantitat"]}`
                                        : "Quantitat"
                                }
                            />
                            <label htmlFor="QUALITAT"></label>
                            <input
                                className={styles.input}
                                id="Qualitat"
                                type="text"
                                name="qualitat"
                                onChange={handleChange}
                                placeholder={
                                    asset["qualitat"] && asset["qualitat"] != "0"
                                        ? `Qualitat: ${asset["qualitat"]}`
                                        : "Qualitat (facetar/caboixó/espèciment...)"
                                }
                            />
                            <label htmlFor="VENTA"></label>
                            <input
                                className={styles.input}
                                id="venta"
                                type="text"
                                name="venta"
                                onChange={handleChange}
                                placeholder={
                                    asset["venta"] && asset["venta"] != "0"
                                        ? `Venta: ${asset["venta"]}`
                                        : "Venta: (web/public/nosaltres...)"
                                }
                            />
                            <label htmlFor="COMENTARIS"></label>
                            <input
                                className={styles.input}
                                id="comentaris"
                                type="text"
                                name="comments"
                                onChange={handleChange}
                                placeholder={
                                    asset["comments"] && asset["comments"] != "0"
                                        ? `Comentaris: ${asset["comments"]}`
                                        : "Comentaris"
                                }
                            />
                        </div>
                    </form>
                    <button onClick={handleUpdate}>Guardar Canvis</button>
                </div>
            ) : null}
        </>
    )
}

export default Edit