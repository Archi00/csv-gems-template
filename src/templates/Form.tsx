import React from "react"
import { IFormData, Table } from "../pages/addAsset"
import styles from "./Form.module.css"

export interface IForm {
    tables: Table[] | undefined
    setTable: (key: string) => void
    setFormData: (object: IFormData) => void
    formData: IFormData | undefined
}

const Form: React.FC<IForm> = ({ setTable, setFormData, formData, tables }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({ ...formData!, [name]: value.toLowerCase() })
    }

    return (
        <div className={styles.wrapper}>
            <form>
                <select onChange={(e) => setTable(e.target.value)}>
                    <>
                        {tables!.map((table, id) => (
                            <option key={id}>{table.TABLE_NAME}</option>
                        ))}
                    </>
                    <option> </option>
                </select>
                <div className={styles.container}>
                    <label htmlFor="Nom"></label>
                    <input
                        className={styles.input}
                        id="nom"
                        name="nom"
                        type="text"
                        onChange={handleChange}
                        placeholder="Nom"
                    />
                    <label htmlFor="Mida"></label>
                    <input
                        className={styles.input}
                        id="mida"
                        type="text"
                        name="mida"
                        onChange={handleChange}
                        placeholder="Mida"
                    />
                    <label htmlFor="Origen"></label>
                    <input
                        className={styles.input}
                        id="origen"
                        type="text"
                        name="origen"
                        onChange={handleChange}
                        placeholder="Origen"
                    />
                    <label htmlFor="Pes KG"></label>
                    <input
                        className={styles.input}
                        id="pes_kg"
                        type="text"
                        name="pesKg"
                        onChange={handleChange}
                        placeholder="Pes KG"
                    />
                    <label htmlFor="Pes GR"></label>
                    <input
                        className={styles.input}
                        id="pes_gr"
                        type="text"
                        name="pesGr"
                        onChange={handleChange}
                        placeholder="Pes GR"
                    />
                    <label htmlFor="PES CT"></label>
                    <input
                        className={styles.input}
                        id="pes_ct"
                        type="text"
                        name="pesCt"
                        onChange={handleChange}
                        placeholder="Pes CT"
                    />
                    <label htmlFor="NUMERO PECES"></label>
                    <input
                        className={styles.input}
                        id="num_peces"
                        type="text"
                        name="numPeces"
                        onChange={handleChange}
                        placeholder="Numero de peces"
                    />
                    <label htmlFor="NUMERO CAPÇA"></label>
                    <input
                        className={styles.input}
                        id="num_capça"
                        type="text"
                        name="numCapça"
                        onChange={handleChange}
                        placeholder="Numero Capça"
                    />
                    <label htmlFor="TALLA"></label>
                    <input
                        className={styles.input}
                        id="talla"
                        type="text"
                        name="talla"
                        onChange={handleChange}
                        placeholder="Talla"
                    />
                    <label htmlFor="COLOR"></label>
                    <input
                        className={styles.input}
                        id="color"
                        type="text"
                        name="color"
                        onChange={handleChange}
                        placeholder="Color"
                    />
                    <label htmlFor="PREU COST PES"></label>
                    <input
                        className={styles.input}
                        id="preu_cost_pes"
                        type="text"
                        name="preuCostPes"
                        onChange={handleChange}
                        placeholder="Preu de cost a pes"
                    />
                    <label htmlFor="PREU COST"></label>
                    <input
                        className={styles.input}
                        id="preu_cost"
                        type="text"
                        name="preuCost"
                        onChange={handleChange}
                        placeholder="Preu de cost"
                    />
                    <label htmlFor="PREU ESTIMAT PES"></label>
                    <input
                        className={styles.input}
                        id="preu_estimat_pes"
                        type="text"
                        name="preuEstimatPes"
                        onChange={handleChange}
                        placeholder="Preu estimat a pes"
                    />
                    <label htmlFor="PREU ESTIMAT"></label>
                    <input
                        className={styles.input}
                        id="preu_estimat"
                        type="text"
                        name="preuEstimat"
                        onChange={handleChange}
                        placeholder="Preu estimat"
                    />
                    <label htmlFor="PVP PES"></label>
                    <input
                        className={styles.input}
                        id="pvp_pes"
                        type="text"
                        name="pvpPes"
                        onChange={handleChange}
                        placeholder="Preu venta al public a pes"
                    />
                    <label htmlFor="PVP"></label>
                    <input
                        className={styles.input}
                        id="pvp"
                        type="text"
                        name="pvp"
                        onChange={handleChange}
                        placeholder="Preu venta al public"
                    />
                    <label htmlFor="QUANTITAT"></label>
                    <input
                        className={styles.input}
                        id="quantitat"
                        type="text"
                        name="quantitat"
                        onChange={handleChange}
                        placeholder="Quantitat"
                    />
                    <label htmlFor="QUALITAT"></label>
                    <input
                        className={styles.input}
                        id="Qualitat"
                        type="text"
                        name="qualitat"
                        onChange={handleChange}
                        placeholder="Qualitat: (facetar/caboixó/espèciment...)"
                    />
                    <label htmlFor="VENTA"></label>
                    <input
                        className={styles.input}
                        id="venta"
                        type="text"
                        name="venta"
                        onChange={handleChange}
                        placeholder="Venta: (web/public/nosaltres...)"
                    />
                    <label htmlFor="COMENTARIS"></label>
                    <input
                        className={styles.input}
                        id="comentaris"
                        type="text"
                        name="comentaris"
                        onChange={handleChange}
                        placeholder="Comentaris"
                    />
                </div>
            </form>
        </div>
    )
}

export default Form
