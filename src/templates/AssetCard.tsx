import Image from "next/image"
import styles from "./AssetCard.module.css"

export interface IAssetCard {
    asset: any
    title: string
}

const AssetCard: React.FC<any> = ({ asset, title, setOnEdit }) => {
    const handleEdit = () => {
        setOnEdit({ state: true, asset })
        console.log(asset)
    }

    return (
        <>
            {asset ? (
                    <div className={styles.card}>
                        <div className={styles.card__header}>
                            <Image
                                src={asset["urls"]}
                                alt="card__image"
                                className={styles.card__image}
                                width="600"
                                height="400"
                            />
                        </div>
                        <div className={styles.card__body}>
                            <div className={styles.card__tags}>
                                <span className={`${styles.tag} ${styles["tag-blue"]}`}>
                                    {title}
                                </span>
                                {asset["color"] ? (
                                    <span className={`${styles.tag} ${styles["tag-blue"]}`}>
                                        {asset["color"]}
                                    </span>
                                ) : null}
                            </div>

                            <h4>{asset["name"]}</h4>
                            <h5>{asset["origin"]}</h5>

                            {/* Mides */}
                            {asset["size"] ? <p>{`${asset["size"]}`}</p> : null}

                            {/* Pes */}
                            {asset["pes_kg"] &&
                            asset["pes_kg"] != 0 &&
                            asset["pes_kg"] != "null" ? (
                                <p>{`${asset["pes_kg"]}kg`}</p>
                            ) : null}
                            {asset["pes_gr"] &&
                            asset["pes_gr"] != 0 &&
                            asset["pes_gr"] != "null" ? (
                                <p>{`${asset["pes_gr"]}gr`}</p>
                            ) : null}
                            {asset["pes_ct"] &&
                            asset["pes_ct"] != 0 &&
                            asset["pes_ct"] != "null" ? (
                                <p>{`${asset["pes_ct"]}ct`}</p>
                            ) : null}

                            {/* Num peces */}
                            {asset["num_peces"] &&
                            asset["num_peces"] != 0 &&
                            asset["num_peces"] != "null" ? (
                                <p>{`${asset["num_peces"]} peces`}</p>
                            ) : null}

                            {/* Preus */}
                            {asset["preu_cost_pes"] &&
                            asset["preu_cost_pes"] != 0 &&
                            asset["preu_cost_pes"] != "null" ? (
                                <p>{`${asset["preu_cost_pes"]}`}</p>
                            ) : null}
                            {asset["preu_cost"] &&
                            asset["preu_cost"] != 0 &&
                            asset["preu_cost"] != "null" ? (
                                <p>{`${asset["preu_cost"]}`}</p>
                            ) : null}
                            {asset["preu_estimat_pes"] &&
                            asset["preu_estimat_pes"] != 0 &&
                            asset["preu_estimat_pes"] != "null" ? (
                                <p>{`${asset["preu_estimat_pes"]}`}</p>
                            ) : null}
                            {asset["preu_estimat"] &&
                            asset["preu_estimat"] != 0 &&
                            asset["preu_estimat"] != "null" ? (
                                <p>{`${asset["preu_estimat"]}`}</p>
                            ) : null}
                            {asset["pvp_pes"] &&
                            asset["pvp_pes"] != 0 &&
                            asset["pvp_pes"] != "null" ? (
                                <p>{`${asset["pvp_pes"]}`}</p>
                            ) : null}
                            {asset["pvp"] && asset["pvp"] != 0 && asset["pvp"] != "null" ? (
                                <p>{`${asset["pvp"]}`}</p>
                            ) : null}

                            {/* Quantitat */}
                            {asset["quantitat"] &&
                            asset["quantitat"] != 0 &&
                            asset["quantitat"] != "null" ? (
                                <p>{`${asset["quantitat"]}`}</p>
                            ) : null}

                            {/* Qualitat */}
                            {asset["qualitat"] &&
                            asset["qualitat"] != 0 &&
                            asset["qualitat"] != "null" ? (
                                <p>{`Qualitat: ${asset["qualitat"]}`}</p>
                            ) : null}

                            {/* Venta */}
                            {asset["venta"] && asset["venta"] != 0 && asset["venta"] != "null" ? (
                                <p>{`${asset["venta"]}`}</p>
                            ) : null}

                            {/* Comments */}
                            {asset["comments"] &&
                            asset["comments"] != 0 &&
                            asset["comments"] != "null" ? (
                                <p>{`${asset["comments"]}`}</p>
                            ) : null}
                        </div>
                        <div className={styles.card__footer}>
                            <div className={styles.user}>
                                <div className={styles.user__info}>
                                    <h6>{asset["num_capça"]}</h6>
                                    <small>{asset["gemid"]}</small>
                                </div>
                            </div>
                            <div onClick={handleEdit} className={styles.edit__footer}>
                                <svg
                                    enableBackground="new 0 0 19 19"
                                    height="19px"
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 19 19"
                                    width="19px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g>
                                        <path
                                            d="M8.44,7.25C8.348,7.342,8.277,7.447,8.215,7.557L8.174,7.516L8.149,7.69   C8.049,7.925,8.014,8.183,8.042,8.442l-0.399,2.796l2.797-0.399c0.259,0.028,0.517-0.007,0.752-0.107l0.174-0.024l-0.041-0.041   c0.109-0.062,0.215-0.133,0.307-0.225l5.053-5.053l-3.191-3.191L8.44,7.25z"
                                            fill="#231F20"
                                        />
                                        <path
                                            d="M18.183,1.568l-0.87-0.87c-0.641-0.641-1.637-0.684-2.225-0.097l-0.797,0.797l3.191,3.191l0.797-0.798   C18.867,3.205,18.824,2.209,18.183,1.568z"
                                            fill="#231F20"
                                        />
                                        <path
                                            d="M15,9.696V17H2V2h8.953l1.523-1.42c0.162-0.161,0.353-0.221,0.555-0.293   c0.043-0.119,0.104-0.18,0.176-0.287H0v19h17V7.928L15,9.696z"
                                            fill="#231F20"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
            ) : null}
        </>
    )
}

export default AssetCard